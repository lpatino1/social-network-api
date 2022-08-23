const router = require('express').Router();

//deconstruct methods to use here
const {getUsers, getSingleUser, createUser, updateUser, deleteUser, createFriend, deleteFriend} = require('../../controllers/usersController');

//get routes post routes for /api/users route
router.route('/')

module.exports = router;
