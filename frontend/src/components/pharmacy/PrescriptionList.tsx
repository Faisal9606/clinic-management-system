interface Prescription {
  id: number;
  patient_name: string;
  doctor_name: string;
  medicine_name: string;
  dosage: string;
  duration: string;
  instructions?: string;
  status: 'pending' | 'dispensed';
  created_at: string;
}

interface PrescriptionListProps {
  prescriptions: Prescription[];
  loading: boolean;
  onDispense: (id: number) => void;
}

const PrescriptionList = ({ prescriptions, loading, onDispense }: PrescriptionListProps) => {
  if (loading) {
    return <div>Loading prescriptions...</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Duration</th>
              <th>Instructions</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.patient_name}</td>
                <td>{prescription.doctor_name}</td>
                <td>{prescription.medicine_name}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.duration}</td>
                <td>{prescription.instructions || '-'}</td>
                <td>{formatDate(prescription.created_at)}</td>
                <td>
                  <span
                    className={`badge ${
                      prescription.status === 'pending'
                        ? 'badge-pending'
                        : 'badge-dispensed'
                    }`}
                  >
                    {prescription.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  {prescription.status === 'pending' && (
                    <button
                      className="btn btn-success"
                      onClick={() => onDispense(prescription.id)}
                    >
                      Dispense
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrescriptionList;
