import axios from './axios/axios-instance';
import { CreateTripInput, Trip, UpdateTripInput } from '../schema/trip-schema';
import {Response} from './response';

const config = require('../../config.js');

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
            throw new Error();
        }
    }

    public async addTrip(trip: CreateTripInput): Promise<Trip> {
        try {
            var response = await axios.post<Response<Trip>>(`${this.baseUrl}/trip`, trip);
            return response.data.payload;
        } catch(error) {
            // logging...
            console.error(error);
            throw new Error();
        }
    }

    public async updateTrip(trip: UpdateTripInput): Promise<Trip> {
        try {
            var response = await axios.put<Response<Trip>>(`${this.baseUrl}/trip`, trip);
            console.error(response.data.payload);
            return response.data.payload;
        } catch(error) {
            // logging...
            throw new Error();
        }
    }
}
