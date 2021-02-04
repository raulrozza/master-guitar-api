import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const foundUser = this.users.find(user => user.id === id);

        return foundUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const foundUser = this.users.find(user => user.email === email);

        return foundUser;
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid(), name, email, password });

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const foundIndex = this.users.findIndex(
            storedUser => storedUser.id === user.id,
        );

        this.users[foundIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;
