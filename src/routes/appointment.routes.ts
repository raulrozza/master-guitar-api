import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRoutes = Router();

appointmentRoutes.use(ensureAuthenticated);

appointmentRoutes.get('/', async (_, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentRoutes.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });

        return response.json(appointment);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default appointmentRoutes;
