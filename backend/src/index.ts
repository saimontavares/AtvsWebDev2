import express from "express";
import getEnv from './utils/getEnv'
import router from './router/router'

const env = getEnv();
const app = express();

// Parse JSON and urlencoded bodies so validators/controllers can read req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get("/", (req, res) => {
  res.send("Olá, bem-vindo(a) ao curso de PW2!");
});

app.listen(env.PORT, () => {
  console.log(`App running on port ${env.PORT}.`);
});