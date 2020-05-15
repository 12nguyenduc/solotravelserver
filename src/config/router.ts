import {Request, Response} from 'express';
import App from '../app';

import UserController from "../controllers/UserController";

export default class Router {
    constructor() {
        App.app.get('/', (req: Request, res: Response) => res.status(200).send('Welcome to solotravel.link'));
        App.app.get('/', (req: Request, res: Response) => res.status(204).send());

        // user
        App.app.post('/api/user/login', UserController.login);
    }
}

