/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import {nodeENV} from "../src/app/config/index.ts"

import router from './app/routes'

const app: Application = express()

//parsers

app.use(express.json())

app.use(cors())

//application routes

app.use('/api/v1', router )


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong'

  res.status(statusCode).json({
    success: false,
    message,
    error: err?.error || null,
    stack: nodeENV === 'development' ? err.stack : undefined,
  })
})



export default app
