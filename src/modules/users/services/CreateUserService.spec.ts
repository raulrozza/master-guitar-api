import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUserService = new CreateUserService(fakeUsersRepository);

        const user = await createUserService.execute({
            name: 'marcos',
            email: 'marcos@gmail.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a user with an existing email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUserService = new CreateUserService(fakeUsersRepository);

        const repeatingEmail = 'marcos@gmail.com';

        await createUserService.execute({
            name: 'marcos',
            email: repeatingEmail,
            password: '123456',
        });

        expect(
            createUserService.execute({
                name: 'joao',
                email: repeatingEmail,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
