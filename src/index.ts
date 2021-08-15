import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'

import { TripResolver } from './resolvers/trip-resolver'

async function main() {
  const schema = await buildSchema({
    resolvers: [TripResolver],
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