// Este archivo sirve para arrancar el servidor y ejecutar lo que hay en app.js

// Importamos app.js
import app from './app.js';

// Incluimos el puerto para acceder. En caso de que no lo reciba de .env, se lo ponemos
// directamente
const PORT = process.env.PORT || 4013;

// Integramos el arranque para la escucha en el puerto 4013:
app.listen(PORT, () => console.log(`Server is live on http://localhost:${PORT}!`));