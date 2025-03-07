import Fragment from "../models/Fragment.model.js";

// GET: All fragments by story
export const getFragmentsByStory = async (req, res, next) => {
  try {
    const storyId = req.params.id;
    const allFragments = await Fragment.find({ story: storyId });
    res.status(200).json(allFragments);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const addFragment = async (req, res, next) => {
  try {
    const storyId = req.params.id;
    const author = req.payload._id;
    const { content } = req.body;
    const newFragment = {
      story: storyId,
      content,
      author
    }
    await Fragment.create(newFragment);
    res.status(201).json({ message: "Fragment created successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const editFragment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const fragmentId = req.params.id;
    const author = req.payload._id;

    //buscamos la historia por su id
    const fragment = await Fragment.findById(fragmentId);

    // si no se encuentra la historia
    if (!fragment) {
      return res.status(404).json({ message: "Fragment not found" });
    }

    // Si la historia no es del autor
    if (fragment.author.toString() !== author) {
      return res.status(403).json({ message: "You are not the author of this story" });
    }

    // editamos el fragmento
    fragment.content = content || fragment.content;
    await fragment.save();
    res.status(200).json({ message: "Fragment edited successfully", fragment});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const deleteFragment = async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const fragmentId = req.params.fragmentId;
    const fragment = await Fragment.findById(fragmentId);

    if (!fragment) {
      res.status(404).send("Fragment not found.");
    }

    if (fragment.author.toString() !== userId) {
      res.status(403).send("You are not authorized.");
    }

    // Eliminamos el fragmento
    await Fragment.findByIdAndDelete(fragmentId);
    res.status(200).json({ message: "Fragment deleted successfully" });

  } catch (error) {
    console.log(error);
    next(error);
  }
}