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

// Añadimos un índice único para que un usuario no pueda votar dos veces por el mismo fragmento
voteSchema.index({ user: 1, fragment: 1 }, { unique: true });

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;