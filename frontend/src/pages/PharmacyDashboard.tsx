import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import PrescriptionList from '../components/pharmacy/PrescriptionList';
import api from '../services/api';

interface Prescription {
  id: number;
  patient_id: number;
  patient_name: string;
  doctor_name: string;
  medicine_name: string;
  dosage: string;
  duration: string;
  instructions?: string;
  status: 'pending' | 'dispensed';
  created_at: string;
}

const PharmacyDashboard = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'dispensed'>('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, [filter]);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await api.get('/prescriptions', { params });
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDispense = async (id: number) => {
    if (!confirm('Mark this prescription as dispensed?')) return;

    try {
      await api.patch(`/prescriptions/${id}/dispense`);
      fetchPrescriptions();
    } catch (error) {
      console.error('Error dispensing prescription:', error);
      alert('Failed to dispense prescription');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Pharmacy Dashboard</h2>
        
        <div className="card">
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button
              className={`btn ${filter === 'pending' ? 'btn-primary' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`btn ${filter === 'dispensed' ? 'btn-success' : ''}`}
              onClick={() => setFilter('dispensed')}
            >
              Dispensed
            </button>
            <button
              className={`btn ${filter === 'all' ? 'btn-primary' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
          </div>

          <PrescriptionList
            prescriptions={prescriptions}
            loading={loading}
            onDispense={handleDispense}
          />
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
