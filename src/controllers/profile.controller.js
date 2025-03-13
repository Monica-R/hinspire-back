import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import Fragment from '../models/Fragment.model.js';
import Story from '../models/Story.model.js';

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
export const editProfile = async (req, res) => {
    try {
        const userId = req.payload._id;
        const { username, email, password } = req.body;
    
        if (!username && !email && !password) {
          return res.status(400).json({ message: "At least one field is required for updating" });
        }
  
        // Obtener usuario actual
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        if (email) {
          const existingUser = await User.findOne({ email });
          if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ message: "Email is already in use" });
          }
        }
  
        // Crear objeto de actualización solo con campos válidos
        const updateData = {};
        if (username?.trim()) updateData.username = username.trim();
        if (email?.trim()) updateData.email = email.trim();
        if (password) {
          const saltRounds = 10;
          updateData.password = await bcrypt.hash(password, saltRounds);
        }
    
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          updateData,
          { new: true }
        );
    
        res.status(200).json({ user: updatedUser });
      } catch (error) {
        next(error);
      }
}

export const deleteProfile = async (req, res, next) => {
    try {
        const userId = req.payload._id;

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        //Eliminamos los fragmentos del usuario
        await Fragment.deleteMany({ author: userId });

        // Buscamos todas las historias del usuario
        const userStories = await Story.find({author: userId});
        
        //  Para cada historia del usuario:
        for (const story of userStories) {
            // Eliminamos todos los fragmentos asociados a esta historia (de cualquier autor)
            await Fragment.deleteMany({ story: story._id });
            
            // Eliminamos la historia
            await Story.findByIdAndDelete(story._id);
        }

        // Obtener IDs de fragmentos del usuario una sola vez
        const userFragmentIds = await Fragment.find({ author: userId }).distinct('_id');

        // Actualizar referencias en historias de otros usuarios
        await Story.updateMany(
            { $or: [
                { pendingFragments: { $in: userFragmentIds } },
                { fragments: { $in: userFragmentIds } }
            ]},
            { 
                $pull: { 
                    pendingFragments: { $in: userFragmentIds },
                    fragments: { $in: userFragmentIds }
                } 
            }
        );
        
        // Lo mismo para fragmentos aceptados
        await Story.updateMany(
            { fragments: { $in: await Fragment.find({ author: userId }).distinct('_id') } },
            { $pull: { fragments: { $in: await Fragment.find({ author: userId }).distinct('_id') } } }
        );

        // Al final, eliminamos al usuario
        await User.findByIdAndDelete(userId);

        res.status(200).json({ 
            message: "Profile deleted successfully" ,
            actions: {
                clearToken: true,
                redirectTo: "/"
            }
        });
    } catch (error) {    
        next(error);
    }
}