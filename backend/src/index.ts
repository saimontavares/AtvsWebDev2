import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"

import getEnv from "./utils/getEnv"
import router from "./router/router"
import createLangCookie from "./middlewares/createLangCookie"
import { PrismaClient } from "./generated/prisma"

const env = getEnv()
const app = express()
const prisma = new PrismaClient()

// Parse JSON and urlencoded bodies so validators/controllers can read req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(createLangCookie)
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: true,
    rolling: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 30 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
    cookie: { maxAge: 2 * 60 * 60 * 1000, httpOnly: true },
  }),
)
app.use(router)

app.get("/", (req, res) => {
  res.send("Olá, bem-vindo(a) ao curso de PW2!")
})

app.listen(env.PORT, () => {
  console.log(`App running on port ${env.PORT}.`)
})
