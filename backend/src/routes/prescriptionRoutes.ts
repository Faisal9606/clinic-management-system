import { Router } from 'express';
import {
  getAllPrescriptions,
  getPrescriptionsByPatient,
  createPrescription,
  dispensePrescription,
} from '../controllers/prescriptionController';
import { authenticateToken } from '../middleware/auth';
import { requireRole } from '../middleware/roleCheck';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllPrescriptions);
router.get('/patient/:patientId', getPrescriptionsByPatient);
router.post('/', requireRole('doctor'), createPrescription);
router.patch('/:id/dispense', requireRole('pharmacist'), dispensePrescription);

export default router;
