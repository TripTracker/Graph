import * as config from "../../config.js";
import { CreateTripInput, Trip, UpdateTripInput } from '../schema/trip-schema';
import {Response} from './response';
import { RESTDataSource, RequestOptions  } from 'apollo-datasource-rest';


export class TripClient extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = config.tripApiUrl;
    }

    public async fetchTrip(tripId: string): Promise<Trip> {
        try {
            var response = await this.get<Response<Trip>>(`${this.baseURL}/trip/${tripId}`, null, this.context.customHeaders);
            return response.payload;
        } catch(error) {
            // logging...
            throw new Error();
        }
    }

    public async fetchTrips(userId: string): Promise<Trip[]> {
        try {
            var response = await this.get<Response<Trip[]>>(`${this.baseURL}/trips/${userId}`, null, this.context.customHeaders);
            return response.payload;
        } catch(error) {
            // logging...
            throw new Error();
        }
    }

    public async addTrip(trip: CreateTripInput): Promise<Trip> {
        try {
            var response = await this.post<Response<Trip>>(`${this.baseURL}/trip`, trip, this.context.customHeaders);
            return response.payload;
        } catch(error) {
            // logging...
            console.error(error);
            throw new Error();
        }
    }

    public async updateTrip(trip: UpdateTripInput): Promise<Trip> {
        try {
            var response = await this.put<Response<Trip>>(`${this.baseURL}/trip`, trip, this.context.customHeaders);
            console.error(response.payload);
            return response.payload;
        } catch(error) {
            // logging...
            throw new Error();
        }
    }
}
