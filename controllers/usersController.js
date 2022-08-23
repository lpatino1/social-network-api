const { User } = require('../models');

module.exports = {
    getUsers(req, res){
        User.find()
        .then((users)=> res.json(users))
        .catch((err)=>res.status(500).json(err));
    },
    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res){
        User.create(req.body)
            .then((dbUserData)=>res.json(dbUserData))
            .catch((err)=> res.status(500).json(err));
        
    },
    updateUser(req,res){
        User.findByIdAndUpdate({_id: req.params.userId}, {$set: {user: req.params.body}})
            .then((user)=> res.json(user))
            .catch((err)=>res.status(500).json(err));
    },
    deleteUser(req, res){
        User.findByIdAndDelete({_id: req.params.userId})
        .then (console.log("Successfully deleted User"))
        .catch((err)=>res.status(500).json(err));
    },
    createFriend(req, res){

    },
    deleteFriend(req, res){
        
    }
};