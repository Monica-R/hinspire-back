// Este archivo sirve para arrancar el servidor y ejecutar lo que hay en app.js

import dotenv from 'dotenv';
dotenv.config();
// Importamos app.js
import app from './app.js';
import { connectDB } from './db/index.js';

// Incluimos el puerto para acceder. En caso de que no lo reciba de .env, se lo ponemos
// directamente
const PORT = process.env.PORT || 4013;

const startServer = async () => {
    try {
        // Conectamos a la base de datos
        await connectDB();
        console.info('🛢️  Conectado a MongoDB');
        
        // Integramos el arranque para la escucha en el puerto 4013:
        app.listen(PORT, () => console.log(`🚀 Server is live on http://localhost:${PORT}!`));
    } catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1); // Salimos del proceso con error
    }
}

startServer(); // Arrancamos el servidor