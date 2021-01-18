import { Router } from 'express';
import appointmentRoutes from './appointment.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/appointments', appointmentRoutes);
router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);

export default router;
