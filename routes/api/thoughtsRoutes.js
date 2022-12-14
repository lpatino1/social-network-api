const router = require('express').Router();

const {
    getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction
} = require('../../controllers/thoughtsController');

//get routes post routes for /api/thoughts route
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/reactionId').put(deleteReaction);

module.exports = router;