import mongoose from "mongoose";

const fragmentSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true 
  },
  story: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Story", 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  votes: { 
    type: Number, 
    default: 0 
  }
});

const Fragment = mongoose.model("Fragment", fragmentSchema);
export default Fragment;