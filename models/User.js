const mongoose = require('mongoose');
const Thought = require('./Thought');


//user schema
const userSchema = new mongoose.Schema({
    username: {type: String, required:true, trim: true, unique: true},
    email: {type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
    thoughts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    },
    {
    toJSON:{
        virtuals: true,
    },
    id:false,
    }
);

//virtual property
userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
})

//compile a  model based on the schema
const User = mongoose.model('User', userSchema);


module.exports = User;