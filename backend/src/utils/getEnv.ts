/* eslint-disable @typescript-eslint/no-unused-vars */
import {cleanEnv, port} from 'envalid';

export default function getEnv() {
    return cleanEnv(process.env, {
        PORT: port({default: 7788}),
    });
}