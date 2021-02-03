import { parseISO } from 'date-fns';
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentRoutes = Router();

appointmentRoutes.use(ensureAuthenticated);

/* appointmentRoutes.get('/', async (_, response) => {
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
}); */

appointmentRoutes.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const appointmentsRepository = new AppointmentsRepository();

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
        appointmentsRepository,
    );

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentRoutes;
