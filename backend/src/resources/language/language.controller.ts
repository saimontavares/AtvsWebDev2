import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { NextFunction, Request, Response } from "express"
import { ALLOWED_LANGUAGES, Language } from "./language.types"

const changeLangCookie = (req: Request, res: Response, next: NextFunction) => {
  const lang = req.query.lang as string | undefined

  if (!lang || !ALLOWED_LANGUAGES.includes(lang as Language)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Idioma inválido. Use: ${ALLOWED_LANGUAGES.join(", ")}` })
  }

  res
    .cookie("lang", lang, { httpOnly: true })
    .status(StatusCodes.OK)
    .json({ message: ReasonPhrases.OK, lang })

  next()
}

export default { changeLangCookie }
