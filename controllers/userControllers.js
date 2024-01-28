const { ObjectId } = require('mongoose').Types;
const { Thought, User, Friend } = require('../models')

module.exports = {
    async getUsers(req,res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getOneUser(req,res) {
        try {
            const newUser = await User.findOne({_id: req.params.UserId});

            res.json(newUser);
        } catch {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser (req,res) {
        try {
            const user = await User.create(req.body);
            res.json (user);
        } catch {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser (req,res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.UserId});

            // do i need to delete all thoughts associated through the username??

            if (!user) {
                return res.status(404).json({ message: 'No such User exists' });
            }

            res.json ({message: 'User successfully deleted!'});
        } catch {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.UserId},
                { $addToSet: {friends: req.body}},
                { runValidators: true, new: true}
            );
            
            if (!user) {
                return res.status(404).json({message:'No User found with that ID. Womp womp.'})
            }
            
            res.json(user);
        } catch {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.UserId},
                { $pull: {friends: {friendId:req.params.FriendId}}},
                { runValidators: true, new: true}
            );
            
            if (!user) {
                return res.status(404).json({message:'No User found with that ID. Womp womp.'})
            }

            res.json(user);
        } catch {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}