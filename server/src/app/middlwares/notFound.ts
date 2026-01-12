/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response, Request } from 'express'
import status from 'http-status'

const notFound = (req: Request, res: Response, next: NextFunction) => {
   res.status(status.NOT_FOUND).json({
    success: false,
    message: 'Api NOt Found',
    error: '',
  })
}

export default notFound
