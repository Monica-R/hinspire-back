import rateLimit from 'express-rate-limit';

export const aiRequestLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minuto
  max: 5,  // Máximo de 5 peticiones por minuto
  message: { error: "Has alcanzado el límite de peticiones. Inténtalo más tarde." },
  headers: true,  // Para mostrar info en las cabeceras de respuesta
});
