interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  medical_history?: string;
}

interface PatientListProps {
  patients: Patient[];
  loading: boolean;
  onSelectPatient: (patient: Patient) => void;
}

const PatientList = ({ patients, loading, onSelectPatient }: PatientListProps) => {
  if (loading) {
    return <div className="card">Loading patients...</div>;
  }

  return (
    <div className="card">
      <h3>Patient List</h3>
      {patients.length === 0 ? (
        <p>No patients found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Medical History</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.contact}</td>
                <td>{patient.medical_history || 'None'}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => onSelectPatient(patient)}
                  >
                    Prescribe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;
