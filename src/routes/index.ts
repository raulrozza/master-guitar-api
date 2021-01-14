import { Router } from 'express';
import appointmentRoutes from './appointment.routes';

const router = Router();

router.use('/appointments', appointmentRoutes);

export default router;
