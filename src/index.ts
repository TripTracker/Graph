import 'reflect-metadata'
import * as express from 'express'
import { graphqlUploadExpress} from 'graphql-upload'

import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { TripResolver } from './resolvers/trip-resolver'
import { LocationResolver } from './resolvers/location-resolver'
import { ContentResolver } from './resolvers/content-resolver'
import { UserResolver } from './resolvers/user-resolver'

import { TripClient } from './data-sources/trip-client'
import { LocationClient } from './data-sources/location-client'
import { UserClient } from './data-sources/user-client'
import { ContentClient } from './data-sources/content-client'

async function bootstrap() {

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      TripResolver, 
      LocationResolver,
      ContentResolver
    ],
    emitSchemaFile: true,
  });

  const PORT = +process.env.PORT || 2020;
  const app = express();

  // TO DO: this config needs to be typed
  const server = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        tripApiClient: new TripClient(),
        locationApiClient: new LocationClient(),
        contentClient: new ContentClient(),
        userClient: new UserClient()
      }
    },
    context: (ctx) => {
      return {
        ...ctx,
          customHeaders: {
              'Authorization': ctx.req.headers.authorization,
              'Content-Type': 'application/json',
        }      
      }
    },
  });

  await server.start();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`graph is running on port ${PORT}`)
  );
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // IGNORES MISSING CERT FOR LOCAL DEV, DO NOT DEPLOY LIKE THIS

bootstrap();
