import { useState, FormEvent } from 'react';
import api from '../../services/api';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  medical_history?: string;
}

interface PrescriptionFormProps {
  patient: Patient;
  onSuccess: () => void;
}

const PrescriptionForm = ({ patient, onSuccess }: PrescriptionFormProps) => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [duration, setDuration] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/prescriptions', {
        patient_id: patient.id,
        medicine_name: medicineName,
        dosage,
        duration,
        instructions,
      });

      setSuccess('Prescription created successfully!');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create prescription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Prescription</h3>
      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
        <p><strong>Patient:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age} | <strong>Gender:</strong> {patient.gender}</p>
        {patient.medical_history && (
          <p><strong>Medical History:</strong> {patient.medical_history}</p>
        )}
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Medicine Name *</label>
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            placeholder="e.g., Amoxicillin"
            required
          />
        </div>

        <div className="form-group">
          <label>Dosage *</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g., 500mg twice daily"
            required
          />
        </div>

        <div className="form-group">
          <label>Duration *</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 7 days"
            required
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Additional instructions for the patient"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Prescription'}
        </button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
