import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import cors from 'cors';

import router from '@shared/infra/http/routes';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);

app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError)
            return response
                .status(error.statusCode)
                .json({ status: 'error', message: error.message });

        console.error(error);

        return response
            .status(500)
            .json({ status: 'error', message: 'Internal server error' });
    },
);

app.listen(5000, () => console.log('Server running'));
