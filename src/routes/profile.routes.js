import express from 'express';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';
import { validateEmail } from '../validators/auth.validators.js';
import { deleteProfile, editProfile, getProfile } from '../controllers/profile.controller.js';

// Instanciamos el router de express
const router = express.Router();

// GET /profile - Obtenemos los datos del usuario autenticado
router.get("/profile", isAuthenticated, getProfile);

// Editar el perfil del usuario autenticado
router.put("/profile", isAuthenticated, validateEmail, editProfile);

// Eliminar el perfil del usuario autenticado
router.delete("/profile", isAuthenticated, deleteProfile);

export default router;