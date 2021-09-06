import * as config from "../../config.js";
import { RESTDataSource  } from 'apollo-datasource-rest';
import { ExpressContext } from 'apollo-server-express';
import { User } from '../schema/user-schema';

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
}