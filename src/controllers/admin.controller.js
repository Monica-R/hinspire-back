import express from 'express';
import User from '../models/User.model.js';


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params._id;
        const user = await User.findById(userId);
        console.log(user);
        // Si no encontramos al usuario, mandamos un 404
        if (!user) {
            res.status(404).send("User is not found");
            return;
        }

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params._id;
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
}