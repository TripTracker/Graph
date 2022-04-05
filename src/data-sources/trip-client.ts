import * as config from "../../config.js";
import { CreateTripInput, Trip, UpdateTripInput } from '../schema/trip-schema';
import {Response} from './response';
import { RESTDataSource, RequestOptions  } from 'apollo-datasource-rest';
import { ExpressContext } from "apollo-server-express";


export class TripClient extends RESTDataSource<ExpressContext> {

    constructor() {
        super();
        this.baseURL = config.tripApiUrl;
    }

    public async fetchTrip(tripId: string): Promise<Trip> {
        try {
            console.log(this.baseURL);
            console.log(config);
            console.log((this.context as any).customHeaders);
            return await this.get<Trip>(`$https://triptracker-trip-api.herokuapp.com/trip/${tripId}`, null, { headers: (this.context as any).customHeaders });
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async fetchTrips(skip: number, take: number): Promise<Trip[]> {
        try {
            return await this.get<Trip[]>(`${this.baseURL}/trips?skip=${skip}&take=${take}`, null, { headers: this.context.req.headers });
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async addTrip(trip: CreateTripInput): Promise<Trip> {
        try {
            console.warn(trip);
            return await this.post<Trip>(`${this.baseURL}/trip`, JSON.stringify(trip), { headers: this.context.req.headers }); // TO DO - BETTER SOLUTION THAN JSON.STRINGIFY
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async updateTrip(trip: UpdateTripInput): Promise<Trip> {
        try {
            return await this.put<Trip>(`${this.baseURL}/trip`, JSON.stringify(trip), { headers: this.context.req.headers }); // TO DO - BETTER SOLUTION THAN JSON.STRINGIFY
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}
