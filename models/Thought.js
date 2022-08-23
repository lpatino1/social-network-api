const mongoose = require('mongoose');


//defines the shape for the reaction subdocument
const reactionSchema= new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: [280, 'Cannot exceed 280 characters, {VALUE}']
    },
    username: {type: String, required: true},
    createdAt: {timestamps: true},
})

//model for Thoughts
const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String, 
        required:true, 
        minLength:[1], 
        maxLength:[280, 'Cannot exceed 280 characters, {VALUE}']
        },
    createdAt: {timestamps: true},
    username: {type: String, required: true},
    reactions: [reactionSchema],
    },
    {
        toJSON:{
            virtuals: true,
        },
        id:false,
    }
);

//virtual property
thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;
});

//compile a  model based on the schema
const Thought = mongoose.model('Thought', thoughtSchema);



module.exports = Thought;