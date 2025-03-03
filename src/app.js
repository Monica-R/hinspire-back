// Importamos express, morgan
// IMPORTANTE añadir start: node server.js y dev nodemon.js en package.json para npm run dev / bun run dev!!

import express from 'express';
//import morgan from 'morgan';

const app = express();

app.use("/", (req, res) => {
    console.info('ESTAMOS EN SERVER!!!');
    res.send('<h1>hola desde el SERVIDOR!</h1>');
})


export default app;