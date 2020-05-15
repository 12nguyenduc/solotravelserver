import {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
} from '../dotenv';
import {createConnection} from "typeorm";
import {Tedis, TedisPool} from "tedis";

export default class DataStore {
    static user: any;
    static connection: any;
    static redis: any;

    constructor() {
        createConnection({
            type: "mysql",
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            username: MYSQL_USERNAME,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE,
            synchronize: true,
            logging: false,
            timezone: '+07:00',
            charset: 'utf8mb4'
        }).then(connection => {
            // here you can start to work with your entities
        }).catch(error => console.log(error));

    }


}
