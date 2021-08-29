import * as config from "../../config.js";
import { RESTDataSource, RequestOptions  } from 'apollo-datasource-rest';
import { Location } from '../schema/location-schema';
import {Response} from './response';
import { ExpressContext } from "apollo-server-express";

export class LocationClient extends RESTDataSource<ExpressContext> {
    
    constructor(){
        super();
        this.baseURL = config.locationApiUrl;
    }

    public async search(query: string): Promise<Location[]> {
        try {
            var response = await this.get<Response<Location[]>>(`${this.baseURL}/locations/${query}`, null, this.context.req.headers);
            return response.payload;
        } catch(error) {
            // logging...
            throw new Error();
        }
    }
}
