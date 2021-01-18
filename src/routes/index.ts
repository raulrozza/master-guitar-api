import { Router } from 'express';
import appointmentRoutes from './appointment.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/appointments', appointmentRoutes);
router.use('/users', usersRouter);

export default router;
