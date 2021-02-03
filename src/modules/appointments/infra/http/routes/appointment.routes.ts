import { parseISO } from 'date-fns';
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';

const appointmentRoutes = Router();

appointmentRoutes.use(ensureAuthenticated);

/* appointmentRoutes.get('/', async (_, response) => {
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
}); */

appointmentRoutes.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentRoutes;
