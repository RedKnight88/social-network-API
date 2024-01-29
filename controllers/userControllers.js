// Bring in models
const { User } = require('../models')

module.exports = {
    // Function for GET all users in database
    async getUsers(req,res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for GET one user in database by Id
    async getOneUser(req,res) {
        try {
            const newUser = await User.findOne({_id: req.params.userId});

            res.json(newUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for POST a user
    async createUser (req,res) {
        try {
            const user = await User.create(req.body);
            res.json (user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Function for PUT for a user, updates email and username
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

    // Function for DELETE a user
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

    // Function to POST to add a friend to a user's friends array
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

    // Function to DELETE a friend from a user's array
    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $pull: {friends: req.params.friendId}},
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