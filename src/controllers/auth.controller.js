import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Importamos el modelo User
import User from '../models/User.model.js';

// Ponemos la cantidad de saltos que debe hacer bcrypt para encriptar
const saltRounds = 10;

// Añadimos los métodos HTTP necesarios para login y signup

// POST /auth/signup - Create a new user
export const signup = async (req, res, next) => {
    try {
        // Usamos <destructuring> en el cuerpo del request para extraer el email, contraseña y el nombre del usuario
        const { email, password, username } = req.body;
        // Encriptamos la contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Creamos un nuevo usuario
        // Guardamos el usuario en la base de datos
        const newUser = User.create({
            email, 
            password: hashedPassword, 
            username 
        });
        console.log("Nuevo usuario creado:", newUser);
        // Generamos el token JWT
        const authToken = jwt.sign(
            { 
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }, // payload
            process.env.TOKEN_SECRET,
            { algorithm: "HS256", expiresIn: "4h" } // Opciones
        )

        // Respondemos con un mensaje de éxito y los datos del usuario creado
        return res.status(201).json({
            message: "User created successfully",
            authToken
        })  
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
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
            const { _id, email, username, role } = user;

            // Construimos un payload con la información del usuario
            const payload = { _id, email, username, role };
            
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
}

export const verify = async (req, res, next) => {
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and is made available on `req.payload`
    // Send back the token payload object containing the user data
    res.status(200).json(req.payload);
}