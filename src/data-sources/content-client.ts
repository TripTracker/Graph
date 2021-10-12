import * as config from "../../config.js";
import { RESTDataSource  } from 'apollo-datasource-rest';
import { ExpressContext } from "apollo-server-express";

export class ContentClient extends RESTDataSource<ExpressContext> {
    
    constructor() {
        super();
        this.baseURL = config.contentApiUrl;
    }

    public async getTripImageKeys(tripId: string): Promise<string[]> {
        try {
            var response = await this.get<string[]>(`${this.baseURL}/trip/${tripId}/images`, null, { headers: this.context.req.headers });
            return response;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}
