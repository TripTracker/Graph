import * as config from "../../config.js";
import { RESTDataSource, RequestOptions  } from 'apollo-datasource-rest';
import { Location } from '../schema/location-schema';
import {Response} from './response';


export class LocationClient extends RESTDataSource {
    
    constructor(){
        super();
        this.baseURL = config.locationApiUrl;
    }

    public async search(query: string): Promise<Location[]> {
        try {
            var response = await this.get<Response<Location[]>>(`${this.baseURL}/locations/${query}`, null, this.context.customHeaders);
            return response.payload;
        } catch(error) {
            // logging...
            throw new Error();
        }
    }
}
