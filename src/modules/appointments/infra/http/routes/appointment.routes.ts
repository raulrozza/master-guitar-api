import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentRoutes = Router();

appointmentRoutes.use(ensureAuthenticated);

appointmentRoutes.get('/', async (_, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentRoutes.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentRoutes;
