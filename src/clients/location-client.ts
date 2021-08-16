import axios from 'axios';
import { Location } from '../schema/location-schema';
import {Response} from './response';

var config = require('../config.js');

export class LocationClient {

    private baseUrl: string = config.locationApiUrl;

    public async search(query: string): Promise<Location[]> {
        try {
            var response = await axios.get<Response<Location[]>>(`${this.baseUrl}/locations/${query}`);
            return response.data.payload;
        } catch(error) {
            console.log(error);
            // logging...
            throw new Error();
        }
    }
}
