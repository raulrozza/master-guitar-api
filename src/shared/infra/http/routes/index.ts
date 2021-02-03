import { Router } from 'express';
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointment.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const router = Router();

router.use('/appointments', appointmentRoutes);
router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);

export default router;
