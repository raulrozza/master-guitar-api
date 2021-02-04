import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const credentials = {
            email: 'marcos@gmail.com',
            password: 'abc123',
        };

        const user = await createUser.execute({
            name: 'marcos',
            ...credentials,
        });

        const response = await authenticateUser.execute(credentials);

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with an unexisting user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const credentials = {
            email: 'marcos@gmail.com',
            password: 'abc123',
        };

        expect(authenticateUser.execute(credentials)).rejects.toBeInstanceOf(
            AppError,
        );
    });

    it('should not be able to authenticate with an invalid password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            name: 'marcos',
            password: 'abc123',
            email: 'marcos@gmail.com',
        });

        expect(
            authenticateUser.execute({
                email: 'marcos@gmail.com',
                password: 'incorrect password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
