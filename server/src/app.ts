/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import router from './app/routes'

import globalErrorHandler from './app/middlwares/globalErrorhandler'
import notFound from './app/middlwares/notFound'

const app: Application = express()

//parsers

app.use(express.json())

const allowedOrigins: string[] = [
  "http://localhost:5173/",
  "https://nebsit.netlify.app/",
];

app.use(
  cors(),
)

//application routes

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next)
})

//not found route
app.use(notFound)

export default app
