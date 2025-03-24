import rateLimit from 'express-rate-limit';

export const aiRequestLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minuto
  max: 100,  // Máximo de 100 peticiones por minuto
  message: { error: "Has alcanzado el límite de peticiones. Inténtalo más tarde." },
  headers: true,  // Para mostrar info en las cabeceras de respuesta
});
