const { ObjectId } = require('mongoose').Types;
const { Thought, User, Reaction } = require('../models')

// aggregates if needed go here
// const reactionCount = async () => {
//     const numOfReacts = await Thought.aggregate().count('reactionCount')
//     return numOfReacts;
// }


module.exports = {
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getOneThought(req,res) {
        try {
            const newThought = await Thought.findOne({_id: req.params.thoughtId});

            res.json(newThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought (req,res) {
        try {
            const thought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: req.body.username
            });

            let currentUser = await User.findOne({_id: req.body.userId});

            currentUser.thoughts.push({_id: req.body.userId});
            currentUser.save();

            res.json (thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

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

    async deleteThought (req,res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }

            // unsure if this is necessary but it feels like I should update the array
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