import apisauce from 'apisauce';
import Constant from '../utilities/Constant';

export default class APIService {

    static async graphAPIFacebookLogin(token: string) {
        return await apisauce.create({
            baseURL: 'https://graph.facebook.com/',
            headers: {
                "Content-Type": "application/json",
            }
        }).get('me', {fields: 'id,name,email', access_token: token});
    }
};
