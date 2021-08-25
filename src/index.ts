import 'reflect-metadata'
import * as Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { TripResolver } from './resolvers/trip-resolver'
import { LocationResolver } from './resolvers/location-resolver'

async function main() {

  const schema = await buildSchema({
    resolvers: [
      TripResolver, 
      LocationResolver
    ],
    emitSchemaFile: true,
  })

  const PORT = 2020;
  const HOST = '0.0.0.0';

  const app = Express()

  const server = new ApolloServer({
    schema,
  })

  await server.start();
  server.applyMiddleware({ app })

  app.listen(PORT, HOST, () =>
    console.log('Server is running on port 2020')
  )
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // IGNORES MISSING CERT FOR LOCAL DEV, DO NOT DEPLOY LIKE THIS

main();