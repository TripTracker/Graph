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

  const app = Express()

  const server = new ApolloServer({
    schema,
  })

  await server.start();
  server.applyMiddleware({ app })

  app.listen(4000, () =>
    console.log('Server is running on http://localhost:4000/graphql')
  )
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // IGNORES MISSING CERT FOR LOCAL DEV, DO NOT DEPLOY LIKE THIS

main();