const router = require('express').Router();
const {getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/thoughtsController');

//get routes post routes for /api/thoughts route
router.route('/').get(getThoughts).get(getSingleThought).create(createThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').create(createReaction).delete(deleteReaction);

module.exports = router;