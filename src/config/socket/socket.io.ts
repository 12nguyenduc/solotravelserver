import JWT from '../jwt/jwToken';
import fs from 'fs';
import path from 'path';
import App from '../../app';
// const redisAdapter = require('socket.io-redis');

import https from 'http';
import socket from 'socket.io';
import {PORT} from '../dotenv';

const options = {
    // key: fs.readFileSync(path.join(__dirname,'../../../FileStorage/certificate/file.pem')),
    // cert: fs.readFileSync(path.join(__dirname,'../../../FileStorage/certificate/file.crt'))
};


export default class SocketIO {
    static socket: any = {};

    constructor() {
        const http = https.createServer(options, App.app);
        const io = socket(http);
        // io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
        io.on('connection', function (socket) {
            if (socket.handshake.query.token === 'test-tmp') {
                //test
            } else {
                if (socket.handshake.query.token) {
                    JWT.verify(socket.handshake.query.token, function (err: any, data: any) {
                        if (err) {
                            socket.disconnect();
                        }
                    })
                } else {
                    socket.disconnect();
                }
            }

        });
        // amqp.connect('amqp://134.209.97.129:5673', function (error0, connection) {
        //     if (error0) {
        //         console.log(error0);
        //     } else {
        //         connection.createChannel(function (error1, channel) {
        //             socketIO.channel = channel;
        //         });
        //     }
        //
        // });
        // io.on('connection', function (socket) {
        //
        //     amqp.connect('amqp://134.209.97.129:5673', function (error0, connection) {
        //         try {
        //             if (error0) {
        //                 console.log(error0);
        //                 socket.disconnect();
        //                 connection.close()
        //             } else {
        //                 connection.createChannel(function (error1, channel) {
        //                     if (error1) {
        //                         throw error1;
        //                     }
        //
        //                     if (socket.handshake.query.token) {
        //                         jwt.verify(socket.handshake.query.token, function (err, data) {
        //                             if (err) {
        //                                 socket.disconnect();
        //                             } else {
        //                                 channel.prefetch(100);
        //                                 channel.assertQueue(data.id, {
        //                                     durable: true
        //                                 });
        //                                 channel.consume(data.id, function (msg) {
        //                                     if (msg.content) {
        //                                         socketIO.socket.emit(data.id, msg.content.toString());
        //                                     }
        //                                 }, {
        //                                     noAck: true
        //                                 });
        //                             }
        //                         })
        //                     } else {
        //                         socket.disconnect();
        //                     }
        //
        //                 });
        //             }
        //             socket.on('disconnect', function (socket1) {
        //                 connection.close()
        //             });
        //         } catch (e) {
        //             socket.disconnect();
        //             connection.close()
        //         }
        //
        //     });
        //
        //
        // });

        http.listen(PORT, function () {
            console.log('listening on *:3000');
        });
        http.timeout=20000;



    }
}
