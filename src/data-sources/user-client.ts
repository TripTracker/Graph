import * as config from "../../config.js";
import { RESTDataSource  } from 'apollo-datasource-rest';
import { ExpressContext } from 'apollo-server-express';
import { LoginResult, User } from '../schema/user-schema';

export class UserClient extends RESTDataSource<ExpressContext> {
    
    constructor(){
        super();
        this.baseURL = config.identityUrl;
    }

    public async getUser(): Promise<User> {
        try {
            return await this.get<User>(`${this.baseURL}/connect/userinfo`, null, { headers: this.context.req.headers });
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async login(googleToken: string): Promise<LoginResult> {
        try {

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            // to do => do not hardcode
            const data = {
                client_id: 'vue',
                client_secret: 'fake_secret',
                grant_type: 'delegation',
                scope: 'graph trip-api location-api content-api openid profile',
                provider: 'google',
                token: googleToken
            }

            const formData = Object.keys(data).map(o => `${o}=${data[o]}`).join('&');

            return await this.post<LoginResult>(`${this.baseURL}/connect/token`, formData, { headers: headers });
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}