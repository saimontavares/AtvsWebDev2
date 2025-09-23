/* eslint-disable @typescript-eslint/no-unused-vars */
import {cleanEnv, port, str} from 'envalid';

export default function getEnv() {
    return cleanEnv(process.env, {
        PORT: port({default: 7788}),
        DEFAULT_LANGUAGE: str({default: 'pt-BR'}),
        SESSION_SECRET: str()
    });
}