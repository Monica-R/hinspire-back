import User from '../models/User.model.js';

// Validamos a que los campos del formulario no estén vacíos
export const validateNotEmpty = (fields) =>  (req, res, next) => {
    for (let field of fields) {
        if (!req.body[field]?.trim() === "") {
            return res.status(400).json({ message: "The field " + field + " is required" });
        }
    }
    next();
}

export const validateEmail = (req, res, next) => {
    const email = req.body.email;

    // Si no se envía email, pasa al siguiente middleware
    if (email === undefined) return next(); 

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // Si el email no cumple con el regex, devolvemos un error
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email. Example email: user@domain.com" });
    }
    next();
}

// Valida fortaleza de la contraseña
export const validatePasswordStrength = (req, res, next) => {
    const password = req.body.password;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "The password must contain:\n- At least 6 characters- At least one uppercase letter- At least one lowercase letter- At least one number."
      });
    }
    next();
};
  
  // Verifica si el email ya está registrado
  export const checkUserExists = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(409).json({  // 409 Conflict es más semántico para recursos duplicados
          message: "The email address is already registered."
        });
      }
      next();
    } catch (err) {
      next(err);
    }
};