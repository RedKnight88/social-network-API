const router = require('express').Router();
const { 
    getUsers,
    createUser,
    getOneUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/userControllers')

// ROUTE - /api/users
// GET all, GET single (by ID), POST new user, PUT user update (by ID), DELETE user (by ID)

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser).delete(deleteUser);

// ROUTE - /api/users/:userId/friends/:friendId
// POST new friend, DELETE friend from list

router.route('/:userId/friends').post(createFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
