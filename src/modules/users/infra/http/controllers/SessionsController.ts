import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

import { RequestHandler } from 'express';

export default class SessionsController {
    public create: RequestHandler = async (request, response) => {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        return response.json({ user, token });
    };
}
