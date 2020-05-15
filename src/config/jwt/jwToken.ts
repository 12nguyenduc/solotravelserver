'use strict';
import jwt from 'jsonwebtoken';
const tokenSecret = "secretissecret";
export default class JWT {

    static sign(payload: any) {
        return jwt.sign(
            payload,
            tokenSecret, // Token Secret that we sign it with
            {
                expiresIn: "30 days" // Token Expire time
            });
    }

    static verify(token: string, callback: any) {
        return jwt.verify(
            token, // The token to be verified
            tokenSecret, // Same token we used to sign
            {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
            callback // Pass errors or decoded token to callback
        );
    }
}
