const router = require('express').Router();
// Brings in functions from controller files, which call on the database to deliver info from server
const { 
    getThoughts,
    createThought,
    getOneThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtControllers')

// ROUTE - /api/thoughts

// GET all, POST new thought
router.route('/').get(getThoughts).post(createThought);

// GET single (by ID), PUT thought update (by ID), DELETE thought (by ID)
router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);


// ROUTE - /api/thoughts/:thoughtId/reactions

// POST reaction to thought's reactions[] array
router.route('/:thoughtId/reactions').post(createReaction);

//DELETE reaction from thought's reactions[] array (byId)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
