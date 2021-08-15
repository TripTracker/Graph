import axios from 'axios';
import { Trip } from '../schema/trip-schema';
import {Response} from './response';

export class TripClient {

    public async fetchTrip(tripId: string): Promise<Trip> {
        try {
            var response = await axios.get<Response<Trip>>(`https://localhost:44353/trip/${tripId}`);
            return response.data.payload;
        } catch(error) {
            console.log(error);
            // logging...
            throw new Error();
        }
    }

    public async fetchTrips(userId: string): Promise<Trip[]> {
        try {
            var response = await axios.get<Response<Trip[]>>(`https://localhost:44353/trips/${userId}`);
            console.log(response.data);

            return response.data.payload;
        } catch(error) {
            // logging...
            throw new Error();
        }
    }
}
