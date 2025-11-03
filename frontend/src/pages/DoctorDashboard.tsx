import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import PatientList from '../components/doctor/PatientList';
import PrescriptionForm from '../components/doctor/PrescriptionForm';
import api from '../services/api';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  medical_history?: string;
}

const DoctorDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPrescriptionForm(true);
  };

  const handlePrescriptionSuccess = () => {
    setShowPrescriptionForm(false);
    setSelectedPatient(null);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Doctor Dashboard</h2>
        
        {showPrescriptionForm && selectedPatient ? (
          <div className="card">
            <button 
              className="btn btn-primary" 
              onClick={() => setShowPrescriptionForm(false)}
              style={{ marginBottom: '20px' }}
            >
              ← Back to Patients
            </button>
            <PrescriptionForm 
              patient={selectedPatient}
              onSuccess={handlePrescriptionSuccess}
            />
          </div>
        ) : (
          <PatientList 
            patients={patients}
            loading={loading}
            onSelectPatient={handleSelectPatient}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
