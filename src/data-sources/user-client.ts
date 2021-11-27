import * as config from "../../config.js";
import { RESTDataSource  } from 'apollo-datasource-rest';
import { ExpressContext } from 'apollo-server-express';
import { LoginData, LoginResult, RefreshData, User } from '../schema/user-schema';

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

    public async login(data: LoginData): Promise<LoginResult> {
        try {

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const formData = Object.keys(data).map(o => `${o}=${data[o]}`).join('&');

            return await this.post<LoginResult>(`${this.baseURL}/connect/token`, formData, { headers: headers });
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async refresh(data: RefreshData): Promise<LoginResult> {
        try {

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const formData = Object.keys(data).map(o => `${o}=${data[o]}`).join('&');

            return await this.post<LoginResult>(`${this.baseURL}/connect/token`, formData, { headers: headers });
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}