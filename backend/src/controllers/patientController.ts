import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import pool from '../config/database';

export const getAllPatients = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM patients ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPatientById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPatient = async (req: AuthRequest, res: Response) => {
  try {
    const { name, age, gender, contact, address, medical_history } = req.body;

    if (!name || !age || !gender || !contact || !address) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const result = await pool.query(
      `INSERT INTO patients (name, age, gender, contact, address, medical_history)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, age, gender, contact, address, medical_history || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create patient error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePatient = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, age, gender, contact, address, medical_history } = req.body;

    const result = await pool.query(
      `UPDATE patients 
       SET name = $1, age = $2, gender = $3, contact = $4, address = $5, medical_history = $6
       WHERE id = $7 RETURNING *`,
      [name, age, gender, contact, address, medical_history, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
