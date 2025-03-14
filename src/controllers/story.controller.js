import Fragment from "../models/Fragment.model.js";
import Story from "../models/Story.model.js";
import mongoose from 'mongoose';


// GET: all stories
export const getStories = async (req, res, next) => {
  try {
    const allStories = await Story.find().populate("author", "username");
    res.status(200).json(allStories);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const getStoryById = async (req, res, next) => {
  try {
    const storyId = req.params.id;
    const getStory = await Story.findById(storyId)
      .populate("author", "username")
      .populate({
        path: "pendingFragments",
        populate: {
          path: "author",
          select: "username"
        }
      })
      .populate({
        path: "fragments",
        populate: {
          path: "author",
          select: "username"
        }
      });
    // si no se encuentra la historia
    if (!getStory) {
      res.status(404).send("Story not found");
      return;
    }

    res.status(200).json(getStory);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const addStory = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const authorId = req.payload._id;
    const authorName = req.payload.username;
    const newStory = {
      title,
      description,
      author : new mongoose.Types.ObjectId(authorId),
      status
    }
    await Story.create(newStory);

    res.status(201).json(
      {
        message: "Story created successfully.", 
        newStory: {...newStory, authorName} //toObject sirve para pasar de un objeto tipo documento mongodb -en este caso- en un objeto normal
      }
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const editStory = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const storyId = req.params.id;
    const userId = req.payload._id;
    const story = await Story.findById(storyId);

    if (!story) {
      res.status(404).send("Story not found.");
      return;
    }
    // Si no pertenece al autor, se te lanza un 403 diciendo que no estás autorizado
    if (story.author.toString() !== userId) {
      res.status(403).send("You are not authorized");
      return;
    }

    // Si la historia tiene fragmentos, no se puede editar
    // Solo bloquear la edición si existen fragmentos aceptados
    if (story.fragments && story.fragments.length > 0) {
      return res.status(403).json({ message: "Cannot edit a story with accepted fragments." });
    }

    story.title = title || story.title;
    story.description = description || story.description;
    story.status = status || story.status;

    // Guardando los cambios
    await story.save();
    res.status(200).json({ message: "Story updated successfully", story });
    return;

  } catch (error) {
    console.log(error);
    next();
  }
}

export const deleteStory = async (req, res, next) => {
  try {
    const storyId = req.params.id;
    const userId = req.payload._id;
    const story = await Story.findById(storyId);

    if (!story) {
      res.status(404).send("Story not found.");
      return;
    }

    if (story.author.toString() !== userId) {
      res.status(403).send("You are not authorized.");
      return;
    }

    // Eliminamos los fragmentos primero en cascada para eliminar luego la historia
    await Fragment.deleteMany({ story: storyId });

    // Eliminamos la historia
    await Story.findByIdAndDelete(storyId);
    
    return res.status(200).json({ message: "Story deleted successully." });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// GET: all stories of user -populate?-
export const getStoriesByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const authenticatedUserId = req.payload._id;

    if (userId !== authenticatedUserId) {
      res.status(403).send("You are not authorized.");
    }

    const allUserStories = await Story.find({ author: userId }).populate("author", "username email");
    res.status(200).json(allUserStories);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const finishStory = async (req, res, next) => {
  try {
    const storyId = req.params.id;
    const userId = req.payload._id;
    const story = await Story.findById(storyId);

    if (!story) {
      res.status(404).send("Story not found.");
      return;
    }

    if (story.author.toString() !== userId) {
      res.status(403).send("You are not authorized to finish this story.");
      return;
    }

    // Cambiar estado de la historia a "completed"
    story.status = "completed";
    // vaciamos la lista de "pendingFragments"
    story.pendingFragments = [];
    // Guardamos los cambios
    await story.save();
    return res.status(200).json({ message: "Story completed successfully"});
  } catch (error) {
    console.log(error);
    next(error);
  }
}