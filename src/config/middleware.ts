import {NextFunction, Request, Response, Errback} from "express";
import ResponseAction from '../models/ResponseAction'
import JWT from './jwt/jwToken';

const excludes = [
    '/',
    '/favicon.ico',
    '/api/user/login',
    '/api/user/login-facebook',
];

export default function Middleware(req: Request, res: Response, next: NextFunction) {
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET,PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    if (req.method === 'OPTIONS') {
        next();
    } else {
        let token;
        if (excludes.indexOf(req.url.split('?')[0]) > -1) {
            next();
        } else {
            const response = new ResponseAction();
            response.status = 401;
            response.message = 'Token invalid';
            if (req.headers && req.headers.authorization) {
                token = req.headers.authorization.replace('Bearer', '').trim();
                JWT.verify(token,  (err: any, data: any) =>{
                    if (err) {
                        res.status(401).json(response);
                    } else {
                        // @ts-ignore
                        req.token = data;
                        next();
                    }
                })
            } else {
                return res.status(401).json(response);
            }

        }
    }

}



