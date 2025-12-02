/* eslint-disable @typescript-eslint/no-unused-vars */
import { cleanEnv, num, port, str, url } from "envalid"

export default function getEnv() {
  return cleanEnv(process.env, {
    FRONTEND_URL: url(),
    PORT: port({ default: 7788 }),
    DEFAULT_LANGUAGE: str({ default: "pt-BR" }),
    SESSION_SECRET: str(),
    BCRYPT_ROUNDS: num({ default: 10 }),
  })
}
