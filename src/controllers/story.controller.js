import Story from "../models/Story.model";



export const getStories = async (req, res, next) => {
  try {
    const allStories = await Story.find({});
  } catch (error) {
    console.log(error);
    next();
  }
}

export const getStoryById = async (req, res, next) => {
  try {
    const getStory = await Story.findById({});
  } catch (error) {
    console.log(error);
    next();
  }
}

export const addStory = async (req, res, next) => {
  try {
    const newStory = await Story.create({});
  } catch (error) {
    console.log(error);
    next();
  }
}

export const editStory = async (req, res, next) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate({});
  } catch (error) {
    console.log(error);
    next();
  }
}

export const deleteStory = async (req, res, next) => {
  try {
    const deletedStory = await Story.findByIdAndDelete({});
  } catch (error) {
    console.log(error);
    next();
  }
}