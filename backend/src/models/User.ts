export interface User {
  id: number;
  username: string;
  password: string;
  role: 'doctor' | 'pharmacist' | 'admin';
  full_name: string;
  created_at: Date;
}

export interface UserResponse {
  id: number;
  username: string;
  role: string;
  full_name: string;
}
