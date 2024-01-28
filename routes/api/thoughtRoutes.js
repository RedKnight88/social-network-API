const router = require('express').Router();
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
// GET all, GET single (by ID), POST new thought, PUT thought update (by ID), DELETE thought (by ID)
// for post -- "push created thought's id to associated Thought's thoughts[] array"

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);

// ROUTE - /api/thoughts/:thoughtId/reactions
// POST reaction to thought's reactions[] array, DELETE reaction from thought's reactions[] array (byId)

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
