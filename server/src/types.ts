import { Request, Response } from 'express'
import { Session, SessionData } from 'express-session'
import { Redis } from 'ioredis'
import { createHumanLoader } from './utils/createHumanLoader'

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number }
  }
  redis: Redis
  res: Response
  humanLoader: ReturnType<typeof createHumanLoader>
}
