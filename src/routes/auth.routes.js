// Añadimos los métodos HTTP necesarios para login y signup
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// Importamos el modelo User
import User from '../models/User.model.js';
// Importamos los validadores -middlewares- que creamos
import { validateNotEmpty, validateEmail, validatePasswordStrength, checkUserExists } from '../validators/auth.validators.js';
// Importamos el middleware de autenticación
import { isAuthenticated } from '../middlewares/jwt.middleware.js';

// Instanciamos el router de express
const router = express.Router();

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup - Create a new user
router.post("/signup",
    validateNotEmpty(["email", "password", "username"]),
    validateEmail,
    validatePasswordStrength,
    checkUserExists,
    async (req, res, next) => {
        try {
            // Usamos <destructuring> en el cuerpo del request para extraer el email, contraseña y el nombre del usuario
            const { email, password, username } = req.body;
            // Encriptamos la contraseña con bcrypt
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            // Creamos un nuevo usuario
            const newUser = { //newUser será la requestBody
                email, 
                password: hashedPassword, 
                username 
            };
            // Guardamos el usuario en la base de datos
            await User.create(newUser);
            // Respondemos con un mensaje de éxito y los datos del usuario creado
            return res.status(201).json({
                message: "User created successfully",
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    username: newUser.username
                }
            })
        } catch (error) {
            next(error);
        }
    
})

// POST /auth/login - Verifies email and password and returns a JWT
router.post("/login",
    validateEmail,
    validatePasswordStrength,
    async (req, res, next) => {
        try {
            // Usamos <destructuring> en el cuerpo del request para extraer el email, contraseña y el nombre del usuario
            const { email, password } = req.body;
            // Buscamos el usuario en la base de datos
            const user = await User.findOne({ email });
            // Si el usuario no existe, respondemos con un error
            if (!user) {
                return res.status(401).json({ message: "User not found." });
            }

            // Comparamos la contraseña encriptada con la contraseña ingresada
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            // Si la contraseña es correcta, creamos un token JWT
            if (isPasswordCorrect) {
                const { _id, email, username } = user;

                // Construimos un payload con la información del usuario
                const payload = { _id, email, username };
                
                // Creamos un token JWT con el payload y el secret
                const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "4h"
                });
                return res.status(200).json({ authToken: token });
            } else { // Si la contraseña no es correcta, respondemos con un error
                return res.status(401).json({ message: "Invalid password." });
            }

        } catch (error) {
            next(error);
        }

});

// GET  /auth/verify - Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and is made available on `req.payload`
    console.log(`req.payload`, req.payload);
    // Send back the token payload object containing the user data
    res.status(200).json(req.payload);
});

router.get("/logout", (req, res) => {
    res.status(200).json({ message: "Logout successful" });
});

export default router;