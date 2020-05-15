import {Response, Request} from "express";
import DataStore from "../config/datastore/datastore";
import Constant from "../utilities/Constant";
import {ObjectID} from "bson";
import SocketIO from "../config/socket/socket.io"
import APIServices from "../sevices/APIService"
import config from "../config/config"
import Utility from "../utilities/Utility";
import JWT from "../config/jwt/jwToken";
import APIService from "../sevices/APIService";
import {getConnection} from "typeorm";
import {Md5} from "md5-typescript";
import moment = require("moment");
import bcrypt from "bcrypt";
import BaseController from "./BaseController";

/* tslint:disable */
export default class UserController extends BaseController {

    constructor() {
        super();
    }

    static async login(req: Request, res: Response) {

        let response = super.Response();
        try {
            const username = req.body.username;
            const tokenFB = req.body.tokenFB;
            if (username && tokenFB) {
                let user = await getConnection().query(`SELECT *FROM user WHERE email='${username}'`);
                console.log(user);
                // const api = await APIService.loginBridgeWebShopF1({email: username, password: password}) as any;
                // if (user && user[0] && api.status === 200 && api.data.meta.status === 200) {
                //     response.data = await UserController.handleLogin(user[0]);
                // } else {
                //     response = super.Response(Constant.response.error_username_or_password_invalid_code, Constant.response.error_username_or_password_invalid_value)
                // }
            } else {
                response = super.Response(Constant.response.error_miss_params_code, Constant.response.error_miss_params_value)
            }
        } catch (e) {
            console.log(e);
            config.log(e);
            response = super.Response(Constant.response.error_occurring_code, Constant.response.error_occurring_value)
        }
        return res.json(response);
    }

    static async handleLogin(user: any) {
        user.token = JWT.sign({id: user.id, name: user.name});
        const privileges = await getConnection().query(`SELECT *FROM cms_privileges WHERE id=${user.id_cms_privileges}`);
        const pri = privileges[0];
        const roles = await getConnection().query(`SELECT cms_moduls.name,cms_moduls.path,is_visible,is_create,is_read,is_edit,is_delete FROM cms_privileges_roles JOIN cms_moduls ON cms_moduls.id=id_cms_moduls WHERE id_cms_privileges=${user.id_cms_privileges}`);
        const avatar = user.social_id ? `https://graph.facebook.com/${user.social_id}/picture` : 'https://www.gravatar.com/avatar/' + Md5.init(user.email) + '?s=100';
        user.is_supper_privilege = pri.is_superadmin;
        user.avatar = avatar;
        user.roles = roles;
        return user;
    }


    static async loginFB(req: Request, res: Response) {
        let response = super.Response();
        // try {
        //     const token = req.body.token;
        //     if (token) {
        //         new Page().updateFacebookAccessToken(token);
        //         const fbLoginRes = await APIService.graphAPIFacebookLogin(token);
        //         if (fbLoginRes.status === 200 && fbLoginRes.data) {
        //             const fbLoginResData: any = fbLoginRes.data as any;
        //             let users = await getConnection().query(`SELECT *FROM cms_users WHERE social_id=${fbLoginResData.id}`);
        //             let user = users[0];
        //             if (user) {
        //                 await getConnection().query(`UPDATE cms_users SET name='${fbLoginResData.name}',email='${fbLoginResData.email}' WHERE id=${user.id}`);
        //                 response.data = await UserController.handleLogin(user);
        //             } else {
        //                 let newUser = await getConnection().query(`INSERT INTO cms_users (email,name,social_id,id_cms_privileges,status) VALUES ('${fbLoginResData.email}','${fbLoginResData.name}','${fbLoginResData.id}',3,'1')`);
        //                 newUser = await getConnection().query(`SELECT *FROM cms_users WHERE id=${newUser.insertId}`);
        //                 newUser = newUser[0];
        //
        //                 await getConnection().query(`INSERT INTO user_social (user_id,social_type,social_uid,social_username,user_token) VALUES ('${newUser.id}',1,'${fbLoginResData.id}','${fbLoginResData.name}','${token}')`);
        //                 let newShop = await getConnection().query(`INSERT INTO shops (cms_user_id,shop_name,status,shop_email) VALUES (${newUser.id},'Shop của ${fbLoginResData.name}',1,'${fbLoginResData.email}')`);
        //                 newShop = await getConnection().query(`SELECT *FROM shops WHERE id=${newShop.insertId}`);
        //                 newShop = newShop[0];
        //
        //                 await getConnection().query(`INSERT INTO user_shop (shop_id,cms_user_id,is_owner) VALUES (${newShop.id},${newUser.id},1)`);
        //                 const defaultPackages = await getConnection().query(`SELECT *FROM tariffs WHERE type='Dùng thử'`);
        //                 const defaultPackage = defaultPackages[0];
        //                 if (defaultPackage) {
        //                     let now = moment().format('YYYY-MM-DD HH:mm');
        //                     let newDate = moment().add('days', 7).format('YYYY-MM-DD HH:mm');
        //                     await getConnection().query(`INSERT INTO shop_services (code,user_num,page_num,price,start_date,end_date,status,shop_id,tariff_id) VALUES (${newShop.id},${defaultPackage.start_user},${defaultPackage.start_page},${defaultPackage.base_price},'${now}','${newDate}','Kích hoạt','${newShop.id}',${defaultPackage.id})`);
        //                 }
        //                 response.data = await UserController.handleLogin(user);
        //             }
        //         } else {
        //             response = super.Response(Constant.response.error_facebook_login_token_code, Constant.response.error_facebook_login_token_value)
        //         }
        //     } else {
        //         response = super.Response(Constant.response.error_miss_params_code, Constant.response.error_miss_params_value)
        //     }
        // } catch (e) {
        //     console.log(e);
        //     config.log(e);
        //     response = super.Response(Constant.response.error_occurring_code, Constant.response.error_occurring_value)
        // }
        return res.json(response);
    }

    static async checkExpiredFacebookToken(req: Request, res: Response) {
        let response = super.Response();
        try {
            const token = req.body.token;
            if (token) {
                const fbLoginRes = await APIService.graphAPIFacebookLogin(token);
                if (fbLoginRes.status === 200 && fbLoginRes.data) {
                } else {
                    response = super.Response(Constant.response.error_facebook_login_token_code, Constant.response.error_facebook_login_token_value)
                }
            } else {
                response = super.Response(Constant.response.error_miss_params_code, Constant.response.error_miss_params_value)
            }
        } catch (e) {
            console.log(e);
            config.log(e);
            response = super.Response(Constant.response.error_occurring_code, Constant.response.error_occurring_value)
        }
        return res.json(response);
    }


};

