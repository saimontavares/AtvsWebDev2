import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { Schema } from "joi"

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    })
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
    next()
  }
}
