export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  medical_history?: string;
  created_at: Date;
}

export interface CreatePatientDTO {
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  medical_history?: string;
}
