import { NextFunction, Request, Response } from "express";
import getEnv from '../utils/getEnv'

const env = getEnv()

const createLangCookie = (req: Request, res: Response, next: NextFunction) => {
    if(!('lang' in req.cookies)) res.cookie('lang',env.DEFAULT_LANGUAGE, {httpOnly: true})
    next();
}

export default createLangCookie;