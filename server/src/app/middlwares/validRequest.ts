import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.targetAudience) {
      req.body.targetAudience = JSON.parse(req.body.targetAudience)
    }

    if (req.body.employeeDetail) {
      req.body.employeeDetail = JSON.parse(req.body.employeeDetail)
    }
    if (req.body.publicDate) {
      req.body.publishDate = JSON.parse(req.body.publishDate)
    }

    try {
      await schema.parseAsync({
        body: req.body,
      })

      return next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateRequest
