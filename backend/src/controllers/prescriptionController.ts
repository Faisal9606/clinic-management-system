import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import pool from '../config/database';

export const getAllPrescriptions = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    
    let query = `
      SELECT p.*, 
             pat.name as patient_name, 
             u.full_name as doctor_name
      FROM prescriptions p
      JOIN patients pat ON p.patient_id = pat.id
      JOIN users u ON p.doctor_id = u.id
    `;
    
    const params: any[] = [];
    
    if (status) {
      query += ' WHERE p.status = $1';
      params.push(status);
    }
    
    query += ' ORDER BY p.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get prescriptions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPrescriptionsByPatient = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId } = req.params;
    
    const result = await pool.query(
      `SELECT p.*, u.full_name as doctor_name
       FROM prescriptions p
       JOIN users u ON p.doctor_id = u.id
       WHERE p.patient_id = $1
       ORDER BY p.created_at DESC`,
      [patientId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get patient prescriptions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPrescription = async (req: AuthRequest, res: Response) => {
  try {
    const { patient_id, medicine_name, dosage, duration, instructions } = req.body;
    const doctor_id = req.user!.id;

    if (!patient_id || !medicine_name || !dosage || !duration) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const result = await pool.query(
      `INSERT INTO prescriptions (patient_id, doctor_id, medicine_name, dosage, duration, instructions, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING *`,
      [patient_id, doctor_id, medicine_name, dosage, duration, instructions || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const dispensePrescription = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const pharmacist_id = req.user!.id;

    const result = await pool.query(
      `UPDATE prescriptions 
       SET status = 'dispensed', dispensed_at = NOW(), dispensed_by = $1
       WHERE id = $2 AND status = 'pending' RETURNING *`,
      [pharmacist_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Prescription not found or already dispensed' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Dispense prescription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
