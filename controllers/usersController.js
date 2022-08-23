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
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true})
            .then((user)=> res.json(user))
            .catch((err)=>res.status(500).json(err));
    },
    deleteUser(req, res){
        User.findByIdAndDelete({_id: req.params.userId})
        .then ((user)=>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : Thought.findOneAndRemove(
                    {_Id: req.params.thoughtId }
                )
        )
        .catch((err)=>res.status(500).json(err));
    },
    createFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.body.userId}},
            {new: true}
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    deleteFriend(req, res){
        User.findById(req.params.userId)
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : User.findOneAndUpdate(
            {friends: req.params.friendId},
            {$pull: {friends:  req.params.friendId}},
            {new: true}
          )
        )
        .then((user)=>
        res.json({message: 'Friend successfully deleted'})
        )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
        
    }
};