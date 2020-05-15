import dotenv from "dotenv"

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    // case "test":
    //     path = `${__dirname}/../../.env.test`;
    //     break;
    // case "production":
    //     path = `${__dirname}/../../.env.production`;
    //     break;
    default:
        path = `${__dirname}/../../.env`;
}
dotenv.config({path});

export const MYSQL_HOST: string = process.env.MYSQL_HOST!;
// tslint:disable-next-line:radix
export const MYSQL_PORT: number = parseInt(process.env.MYSQL_PORT!);
export const MYSQL_USERNAME: string = process.env.MYSQL_USERNAME!;
export const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD!;
export const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE!;

// tslint:disable-next-line:radix
export const PORT: number = parseInt(process.env.PORT!);
