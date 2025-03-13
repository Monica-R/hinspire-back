// aqui implementamos el middleware de jwt

import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    // Extraemos el token de la petición (cabeceras)
    const token = getTokenFromHeaders(req);
    // Si no hay token, respondemos con un error
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Verificamos el token
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
            algorithms: ["HS256"]
        });
        // Si el token es válido, guardamos el payload en el objeto request
        req.payload = payload;
        // Pasamos al siguiente middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
    // Check if the token is available on the request Headers
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      // Get the encoded token string and return it
      const token = req.headers.authorization.split(" ")[1];
      return token;
    }
  
    return null;
}