import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { LanguageChangeDTO } from "./language.types";

const change = (req: Request, res: Response, next: NextFunction) => {
    const { lang } = req.body as LanguageChangeDTO;
    res.cookie('lang', lang).status(StatusCodes.OK).json(ReasonPhrases.OK);
    next()
}

export default { change };
