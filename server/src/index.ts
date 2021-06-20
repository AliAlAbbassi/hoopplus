import 'reflect-metadata'
import 'dotenv-safe/config'
import { createConnection } from 'typeorm'
import path from 'path'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import cors from 'cors'
import { __prod__, COOKIE_NAME } from './constants'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { HumanResolver } from './resolvers/human'
import { createHumanLoader } from './utils/createHumanLoader'
import { Human } from './entities/Human'

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Human],
  })

  const app = express()
  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)

  app.set('trust proxy', 1)
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  )
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? '.codeponder.com' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  )
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HumanResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      humanLoader: createHumanLoader(),
    }),
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  app.listen(parseInt(process.env.PORT!), () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})
