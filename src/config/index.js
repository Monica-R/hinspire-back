// Importamos express, morgan, CORS, y cookie-parser para las cookies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Incluimos la ruta del frontend
const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

// Hacemos la configuración
export const config = {
    port : process.env.PORT,
    clientOrigin: FRONTEND_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    applyMiddlewares: (app) => {
        app.use(cors({
            origin: FRONTEND_URL,
            credentials: true
        }));

        app.use(morgan("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended : false }));
        app.use(cookieParser());
    }
}