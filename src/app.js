// Importamos express, morgan
// IMPORTANTE añadir start: node server.js y dev nodemon.js en package.json para npm run dev / bun run dev!!

import express from 'express';
import { config } from './config/index.js';
import { handlingErrors } from './errors/index.js';
import authRoutes from './routes/auth.routes.js';
import profileRoute from './routes/profile.routes.js';
import adminRoutes from './routes/admin.routes.js';
import storyRoutes from './routes/story.routes.js';
import fragmentRoutes from './routes/fragment.routes.js';
import voteRoutes from './routes/votes.routes.js';
import geminiRoutes from './routes/gemini.routes.js';

const app = express();
app.set("trust proxy", 1);
config.applyMiddlewares(app);


// 👇 Start handling routes here

app.use("/auth", authRoutes);
app.use("/user", profileRoute);
app.use("/admin", adminRoutes);
app.use("/stories", storyRoutes);
app.use("/fragments", fragmentRoutes);
app.use("/votes", voteRoutes);
app.use("/gemini", geminiRoutes);

app.use("/", (req, res, next) => {
    console.info('ESTAMOS EN SERVER!!');
    res.status(200).send("HOLA DESDE SERVER");
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
handlingErrors(app);


export default app;