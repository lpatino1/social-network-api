const router = require('express').Router();
const {getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/thoughtsController');

//get routes post routes for /api/thoughts route
router.route('/')

module.exports = router;