import { Router } from 'express';
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
} from '../controllers/patientController';
import { authenticateToken } from '../middleware/auth';
import { requireRole } from '../middleware/roleCheck';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', requireRole('doctor', 'admin'), createPatient);
router.put('/:id', requireRole('doctor', 'admin'), updatePatient);

export default router;
