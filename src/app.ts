import DataStore from './config/datastore/datastore';
import Router from './config/router';
import express from 'express';
import SocketIO from './config/socket/socket.io';
import FileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import Config from './config/config';
import RateLimit from 'express-rate-limit';
import Middleware from './config/middleware';

export default class App {
    static app: express.Application = express();

    constructor() {
        App.app = express();
        App.app.use(express.static(__dirname + '/public'));
        App.app.use(Middleware);
        App.app.use(FileUpload({}));
        App.app.use(cookieParser());
        App.app.use(express.json());
        App.app.use(RateLimit({windowMs: 5 * 60 * 1000, max: 300}));
        // App.app.use(cors(this.options));
        new DataStore();
        new SocketIO();
        new Config();
        new Router();
    }

}
new App();


