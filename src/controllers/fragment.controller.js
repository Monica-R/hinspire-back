import Fragment from "../models/Fragment.model.js";


export const getFragments = async (req, res, next) => {
  try {
    const allFragments = await Fragment.find({});
  } catch (error) {
    console.log(error);
    next();
  }
}

export const addFragment = async (req, res, next) => {
  try {
    const newFragment = await Fragment.create({});
  } catch (error) {
    console.log(error);
    next();
  }
}

export const editFragment = async (req, res, next) => {
  try {
    const updatedFragment = await Fragment.findByIdAndUpdate({});
  } catch (error) {
    console.log(error);
    next();
  }
}

export const deleteFragment = async (req, res, next) => {
  try {
    const deletedFragment = await Fragment.findByIdAndDelete({});
  } catch (error) {
    console.log(error);
    next();
  }
}