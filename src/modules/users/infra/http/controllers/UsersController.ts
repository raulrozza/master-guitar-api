import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import { RequestHandler } from 'express';

export default class UsersController {
    public create: RequestHandler = async (request, response) => {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ name, email, password });

        return response.json(user);
    };
}
