import fs from 'fs';
import path from 'path';
import winston, {LoggerOptions, loggers} from "winston";
import moment from 'moment';
import Constant from '../utilities/Constant';

export default class Config {
    static logger:any;

    static async log(message:any) {
        await this.exec();
        this.logger.info({message, time: new Date().toLocaleString()});
    }

    constructor() {
        Config.exec();
    }

    static async exec() {
        const logFilePath=`FileStorage/logs/${moment().format('YYYY-MM-DD').toString()}.log`;
        const logFile = await fs.existsSync(logFilePath);
        if (logFile){
            console.log('logFile',logFile);
            Config.logger = winston.createLogger({
                level: 'info',
                format: winston.format.json(),
                transports: [
                    //
                    // - Write to all logs with level `info` and below to `combined.log`
                    // - Write all logs error (and below) to `error.log`.
                    //
                    new winston.transports.Console(),
                    new winston.transports.File({filename: logFilePath})
                ]
            });
        }else{
            console.log(`file log don't exist`);
        }
    }


}
