const router = require('express').Router();
// Brings in functions from controller files, which call on the database to deliver info from server
const { 
    getUsers,
    createUser,
    getOneUser,
    deleteUser,
    updateUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/userControllers')

// ROUTE - /api/users

// GET all, POST new user
router.route('/').get(getUsers).post(createUser);

// GET single (by ID), PUT user update (by ID), DELETE user (by ID)
router.route('/:userId').get(getOneUser).delete(deleteUser).put(updateUser);


// ROUTE - /api/users/:userId/friends/:friendId

// POST new friend
router.route('/:userId/friends').post(createFriend);

// DELETE friend from list
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
