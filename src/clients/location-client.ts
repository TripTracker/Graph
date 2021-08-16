import axios from 'axios';
import { Location } from '../schema/location-schema';
import {Response} from './response';

export class LocationClient {

    public async search(query: string): Promise<Location[]> {
        try {
            var response = await axios.get<Response<Location[]>>(`https://localhost:44359/locations/${query}`);
            console.log(response.data);
            return response.data.payload;
        } catch(error) {
            console.log(error);
            // logging...
            throw new Error();
        }
    }
}
