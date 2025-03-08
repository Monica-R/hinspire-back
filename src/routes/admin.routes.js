import express from 'express';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import { validateEmail } from '../validators/auth.validators.js';
import { getAllUsers, getUserById, updateUser } from '../controllers/admin.controller.js';

// Instanciamos el router de express
const router = express.Router();

// GET /admin/users/:id - Obtenemos el usuario por el id
router.get("/users/:_id", isAuthenticated, isAdmin, validateEmail, getUserById);

// GET /admin/users - Obtenemos todos los usuarios
router.get("/users", isAuthenticated, isAdmin, validateEmail, getAllUsers);

// PUT /admin/users/:id - Actualizamos un usuario
router.put("/users/:_id", isAuthenticated, isAdmin, validateEmail, updateUser);

export default router;