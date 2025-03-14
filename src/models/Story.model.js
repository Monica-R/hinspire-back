import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    required: true
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
  pendingFragments: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Fragment" 
    }
  ],
  fragments: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Fragment" 
    }
  ],
}, { timestamps: true });

const Story = mongoose.model("Story", storySchema);
export default Story;