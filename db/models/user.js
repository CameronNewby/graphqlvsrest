'use strict';

const mongoose = require('mongoose');

exports = module.exports = create;

function create() {

    let postSchema = new mongoose.Schema({
        title: { type: String },
        content: { type : String },
        comments: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String}
        }]
    }, {strict: false});

    let userSchema = new mongoose.Schema({
        name: { type: String },
        age: { type: Number },
        posts: [postSchema],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    }, {strict: false});
    
    return mongoose.model('User', userSchema, 'users');
}
