const { Thought } = require('../models');

module.exports = {
    getThoughts(req, res){
        Thought.find()
        .then((thoughts)=> res.json(thoughts))
        .catch((err)=>res.status(500).json(err));
    },
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res){
        Thought.create(req.body)
            .then((dbThoughtData)=>res.json(dbThoughtData))
            .catch((err)=> res.status(500).json(err));
        
    },
    updateThought(req,res){
        Thought.findByIdAndUpdate({_id: req.params.thoughtId}, {$set: {thought: req.params.body}})
            .then((thought)=> res.json(thought))
            .catch((err)=>res.status(500).json(err));
    },
    deleteThought(req, res){
        Thought.findByIdAndDelete({_id: req.params.thoughtId})
        .then (console.log("Successfully deleted thought"))
        .catch((err)=>res.status(500).json(err));
    },
    createReaction(req, res){

    },
    deleteReaction(req, res){
        
    }
};