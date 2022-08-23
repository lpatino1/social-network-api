const { Thought } = require('../models');

module.exports = {
    getThoughts(req, res){
        Thought.find()
        .then((thoughts)=> res.json(thoughts))
        .catch((err)=>res.status(500).json(err));
    },
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res){
        Thought.create(req.body)
            .then((thought)=>{
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$addToSet: {thoughts: {_id: thought._id} }},
                    {new: true}
                );
            })
            .then((user) =>
                !user
                ? res
                    .status(404)
                    .json({ message: 'Thought created, but found no user with that ID' })
                : res.json('Created the thought')
            )
            .catch((err)=> res.status(500).json(err));
        
    },
    updateThought(req,res){
        Thought.findByIdAndUpdate({_id: req.params.thoughtId}, {$set:  req.body}, {new: true})
            .then((thought)=> res.json(thought))
            .catch((err)=>res.status(500).json(err));
    },
    deleteThought(req, res){
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created but no user with this id!' })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res){
        console.log(req.body);
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {new: true}
        )
        .then((thought)=>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err)=> res.status(500).json(err));
    },
    deleteReaction(req, res){
        Thought.findbyId(req.params.thoughtId)
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : Thought.findOneAndUpdate(
            {reactions: req.params.reactionId},
            {$pull: {reactions: req.params.reactionId}},
            {new: true}
          )
        )
        .then((thought)=>
        res.json({message: 'Reaction successfully deleted'})
        )
      .catch((err) => res.status(500).json(err));
    }
};