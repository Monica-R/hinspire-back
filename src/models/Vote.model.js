import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  fragment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Fragment", 
    required: true 
  },
});

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;