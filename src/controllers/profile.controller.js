import express from 'express';
import User from '../models/User.model.js';

// GET /profile - Obtenemos los datos del usuario autenticado
export const getProfile = async (req, res) => {
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
}

// Editar el perfil del usuario autenticado
export const editProfile = async (req, res, next) => {
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
    
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        next(error);
    }
}

export const deleteProfile = async (req, res, next) => {
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
}