import * as config from "../../config.js";
import { RESTDataSource  } from 'apollo-datasource-rest';
import { ExpressContext } from "apollo-server-express";
import { ReadStream } from "fs";

export class ContentClient extends RESTDataSource<ExpressContext> {
    
    constructor() {
        super();
        this.baseURL = config.contentApiUrl;
    }

    public async getTripImageKeys(tripId: string): Promise<string[]> {
        try {
            const response = await this.get<string[]>(`${this.baseURL}/trip/${tripId}/images`, null, { 
                headers: this.context.req.headers          
            });

            return response;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async uploadImage(tripId: string, fileStream: ReadStream): Promise<void>{
        try {

            const data = {
                files: fileStream
            };

            const response = await this.put<string[]>(`${this.baseURL}/trip/${tripId}/images`, data, { 
                headers: { ...this.context.req.headers, 'Content-Type': 'multipart/form-data'}              
            });

            console.error(response);
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}
