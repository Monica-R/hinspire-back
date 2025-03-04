// Importamos express, morgan
// IMPORTANTE añadir start: node server.js y dev nodemon.js en package.json para npm run dev / bun run dev!!

import express from 'express';
import { config } from './config/index.js';

const app = express();
config.applyMiddlewares(app);

app.use("/", (req, res) => {
    console.info('ESTAMOS EN SERVER!!');
    res.send('<h1>hola desde el SERVIDOR!</h1>');
})


export default app;