const { ObjectId } = require('mongoose').Types;
const { Thought, User, Reaction } = require('../models')

module.exports = {
    async getUsers(req,res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getOneUser(req,res) {
        try {
            const newUser = await User.findOne({_id: req.params.userId});

            res.json(newUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser (req,res) {
        try {
            const user = await User.create(req.body);
            res.json (user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req,res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.userId}, 
                {
                    username: req.body.username,
                    email: req.body.email
                }
            );
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser (req,res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});

            // do i need to delete all thoughts associated through the username??

            if (!user) {
                return res.status(404).json({ message: 'No such User exists' });
            }

            res.json ({message: 'User successfully deleted!'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $addToSet: {friends: req.body}},
                { runValidators: true, new: true}
            );
            
            if (!user) {
                return res.status(404).json({message:'No User found with that ID. Womp womp.'})
            }
            
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $pull: {friends: {friendId:req.params.friendId}}},
                { runValidators: true, new: true}
            );
            
            if (!user) {
                return res.status(404).json({message:'No User found with that ID. Womp womp.'})
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}