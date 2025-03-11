import Vote from '../models/Vote.model.js';
import Fragment from '../models/Fragment.model.js';

export const addVote = async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const fragmentId = req.params.fragmentId;

        // Comprobamos que fragmentId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(fragmentId)) {
            res.status(400).json({ message: "Invalid fragmentId." });
            return;
        }

        // Comprobamos si el usuario ha votado
        // Lo buscamos con findOne
        const existingVote = await Vote.findOne({ user: userId, fragment: fragmentId });
        if (existingVote) {
            res.status(400).send("You are already vote for this fragment.");
            return;
        }

        // Creamos el voto
        const newVote = await Vote.create( { user: userId, fragment: fragmentId });

        // Incrementamos el nº de votos en el model fragment
        await Fragment.findByIdAndUpdate(fragmentId, { $inc: { votes: 1 } });
        res.status(200).json({ message: "You are voted successfully.",  vote: newVote});

    } catch (error) {
        next(error);   
    }
}

export const deleteVote = async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const fragmentId = req.params.fragmentId;

        // Comprobamos que fragmentId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(fragmentId)) {
            res.status(400).json({ message: "Invalid fragmentId." });
            return;
        }

        // Comprobamos si el voto existe
        const vote = await Vote.findOne({ user: userId, fragment: fragmentId });
        if (!vote) {
            res.status(400).send("You are not voted for this fragment.");
            return;
        }

        // Eliminamos el voto
        await Vote.findByIdAndDelete(vote._id);

        // Reducimos la cantidad de votos a una
        await Fragment.findByIdAndUpdate(fragmentId, { $inc: { votes: -1 } });
        res.status(200).json({ message: "Vote removed successfully." });
    } catch (error) {
        next(error);
    }
}