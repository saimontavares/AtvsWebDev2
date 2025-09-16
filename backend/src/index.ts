import express from "express";
import getEnv from './utils/getEnv'
import router from './router/router'

const env = getEnv();
const app = express();

app.use(router);

app.get("/", (req, res) => {
  res.send("Olá, bem-vindo(a) ao curso de PW2!");
});

app.listen(env.PORT, () => {
  console.log(`App running on port ${env.PORT}.`);
});