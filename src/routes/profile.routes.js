import express from 'express';
import { isAuthenticated } from '../middlewares/jwt.middleware';
import User from '../models/User.model';
import { validateEmail } from '../validators/auth.validators';

// Instanciamos el router de express
const router = express.Router();

// GET /profile - Obtenemos los datos del usuario autenticado
router.get("/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.payload._id;
      const user = await User.findById(userId).select("-password");
      // NOTA: En mongoose, el método select() se usa para excluir campos de la respuesta
      // En este caso, excluimos el campo password con el uso de un guión (-<campo>)
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
});

// Editar el perfil del usuario autenticado
router.put("/profile", isAuthenticated, validateEmail, async (req, res) => {
    try {
      const userId = req.payload._id;
      const { name, email } = req.body;
  
      if (!name && !email) {
        return res.status(400).json({ message: "At least one field is required for updating" });
      }

        // Crear objeto de actualización solo con campos válidos
        const updateData = {};
        if (name?.trim()) updateData.name = name.trim();
        if (email?.trim()) updateData.email = email.trim();
  
      if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
          return res.status(400).json({ message: "Email is already in use" });
        }
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true }
      ).select("-password");
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      next(error);
    }
});

router.delete("/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.payload._id;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {    
      next(error);
    }
});