export interface Prescription {
  id: number;
  patient_id: number;
  doctor_id: number;
  medicine_name: string;
  dosage: string;
  duration: string;
  instructions?: string;
  status: 'pending' | 'dispensed';
  created_at: Date;
  dispensed_at?: Date;
  dispensed_by?: number;
}

export interface CreatePrescriptionDTO {
  patient_id: number;
  medicine_name: string;
  dosage: string;
  duration: string;
  instructions?: string;
}
