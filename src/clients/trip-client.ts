import axios from 'axios';
import { Trip } from '../schema/trip-schema';
import {Response} from './response';

var config = require('../../config.js');

export class TripClient {

    private baseUrl: string = config.tripApiUrl;

    public async fetchTrip(tripId: string): Promise<Trip> {
        try {
            var response = await axios.get<Response<Trip>>(`${this.baseUrl}/trip/${tripId}`);
            return response.data.payload;
        } catch(error) {
            // logging...
            throw new Error();
        }
    }

    public async fetchTrips(userId: string): Promise<Trip[]> {
        try {
            var response = await axios.get<Response<Trip[]>>(`${this.baseUrl}/trips/${userId}`);
            return response.data.payload;
        } catch(error) {
            // logging...
            console.log(error);
            throw new Error();
        }
    }
}
