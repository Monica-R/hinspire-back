import express from 'express';
// Importamos los validadores -middlewares- que creamos
import { validateNotEmpty, validateEmail, validatePasswordStrength, checkUserExists } from '../validators/auth.validators.js';
// Importamos el middleware de autenticación
import { isAuthenticated } from '../middlewares/jwt.middleware.js';
import { login, signup, verify } from '../controllers/auth.controller.js';

// Instanciamos el router de express
const router = express.Router();

// POST /auth/signup - Create a new user
router.post("/signup",
    validateNotEmpty(["email", "password", "username"]),
    validateEmail,
    validatePasswordStrength,
    checkUserExists,
    signup
);

// POST /auth/login - Verifies email and password and returns a JWT
router.post("/login",
    validateEmail,
    validatePasswordStrength,
    login
);

// GET  /auth/verify - Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, verify);

router.get("/logout", (req, res) => {
    res.status(200).json({ message: "Logout successful" });
});

export default router;