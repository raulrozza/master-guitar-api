import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const foundAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return foundAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, {
            id: uuid(),
            date,
            provider_id,
        });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default FakeAppointmentsRepository;
