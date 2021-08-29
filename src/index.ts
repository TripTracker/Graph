import 'reflect-metadata'
import * as express from 'express'

import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { TripResolver } from './resolvers/trip-resolver'
import { LocationResolver } from './resolvers/location-resolver'
import { TripClient } from './data-sources/trip-client'
import { LocationClient } from './data-sources/location-client'

async function bootstrap() {

  const schema = await buildSchema({
    resolvers: [
      TripResolver, 
      LocationResolver
    ],
    emitSchemaFile: true,
  });

  const PORT = 2020;
  const HOST = '0.0.0.0';

  const app = express();

  const server = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        tripApiClient: new TripClient(),
        locationApiClient: new LocationClient()
      }
    },
    context: (ctx) => {
      return {
        ...ctx,
          customHeaders: {
            headers: {
              ...ctx.req.headers,
                credentials: 'same-origin',
                'Content-Type': 'application/json',
            }
        }      
      }
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, HOST, () =>
    console.log('graph is running on port 2020')
  );
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // IGNORES MISSING CERT FOR LOCAL DEV, DO NOT DEPLOY LIKE THIS

bootstrap();
