import { Router } from 'express';
import pool from '../config/database';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/setup', async (req, res) => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('doctor', 'pharmacist', 'admin')),
        full_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create patients table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        gender VARCHAR(50) NOT NULL,
        contact VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        medical_history TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create prescriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS prescriptions (
        id SERIAL PRIMARY KEY,
        patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
        doctor_id INTEGER REFERENCES users(id),
        medicine_name VARCHAR(255) NOT NULL,
        dosage VARCHAR(100) NOT NULL,
        duration VARCHAR(100) NOT NULL,
        instructions TEXT,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'dispensed')),
        created_at TIMESTAMP DEFAULT NOW(),
        dispensed_at TIMESTAMP,
        dispensed_by INTEGER REFERENCES users(id)
      )
    `);

    // Insert default users
    const doctorPassword = await bcrypt.hash('doctor123', 10);
    const pharmacistPassword = await bcrypt.hash('pharma123', 10);

    await pool.query(`
      INSERT INTO users (username, password, role, full_name)
      VALUES 
        ('doctor1', $1, 'doctor', 'Dr. John Smith'),
        ('pharmacist1', $2, 'pharmacist', 'Sarah Johnson')
      ON CONFLICT (username) DO NOTHING
    `, [doctorPassword, pharmacistPassword]);

    // Insert sample patients
    await pool.query(`
      INSERT INTO patients (name, age, gender, contact, address, medical_history)
      VALUES 
        ('Michael Brown', 45, 'Male', '555-0101', '123 Main St', 'Hypertension, Diabetes'),
        ('Emily Davis', 32, 'Female', '555-0102', '456 Oak Ave', 'No known allergies'),
        ('Robert Wilson', 58, 'Male', '555-0103', '789 Pine Rd', 'Asthma')
      ON CONFLICT DO NOTHING
    `);

    res.json({ 
      success: true, 
      message: 'Database initialized successfully!' 
    });
  } catch (error: any) {
    console.error('Setup error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;
