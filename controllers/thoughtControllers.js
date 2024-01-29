// Bring in models
const { Thought, User } = require('../models')

module.exports = {
    // Function for GET all thoughts in database
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for GET one thought in database by Id
    async getOneThought(req,res) {
        try {
            const newThought = await Thought.findOne({_id: req.params.thoughtId});

            res.json(newThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for POST a thought, using the userId as an identifier to add the thought to the user's array of thoughts
    async createThought (req,res) {
        try {
            const thought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: req.body.username
            });

            let currentUser = await User.findOne({_id: req.body.userId});

            // found another way to update a document, rather than doing aggregate function queries using mongo's dollarsign functions
            currentUser.thoughts.push({_id: req.body.userId});
            currentUser.save();

            res.json (thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for PUT for a thought, just updates the text
    async updateThought(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, 
                {
                    thoughtText: req.body.thoughtText
                },
                {new:true}
            );
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for DELETE thought, and pulls the thought out of the user's array
    async deleteThought (req,res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }

            const user = await User.findOneAndUpdate(
                {username: thought.username},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            );
            
            if (!user) {
                return res.status(404).json({
                    message: 'Thought deleted, but no user found',
                });
            }

            res.json ({message: 'Thought successfully deleted!'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for POST a reaction to a thought, using the dollarsign functions in mongoDB
    async createReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: {reactions: req.body}},
                { runValidators: true, new: true}
            );
            
            if (!thought) {
                return res.status(404).json({message:'No thought found with that ID. Womp womp.'})
            }
            
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for DELETE a reaction to a thought
    async deleteReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: {reactions: {_id: req.params.reactionId}}},
                { runValidators: true, new: true}
            );
            
            if (!thought) {
                return res.status(404).json({message:'No thought found with that ID. Womp womp.'})
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}