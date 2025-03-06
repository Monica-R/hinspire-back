import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["inProgress", "completed"], 
    default: "inProgress" 
  }, 
});

const Story = mongoose.model("Story", storySchema);
export default Story;