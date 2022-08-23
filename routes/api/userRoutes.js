const router = require('express').Router();

//deconstruct methods to use here
const {getUsers, getSingleUser, createUser, updateUser, deleteUser, createFriend, deleteFriend} = require('../../controllers/usersController');

//get routes post routes for /api/users route
router.route('/').get(getUsers).get(getSingleUser).post(createUser).put(updateUser).delete(deleteUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//do I want /:userID here?
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;
