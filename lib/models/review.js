'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  
/**
 * Review Schema
 */
var QuestionsSchema = new Schema({
    question: {
        type: String
    },
    answer : {
        type:number,
        min: 1, 
        max: 10
    }
});

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    creative: {
        type: Schema.ObjectId,
        ref: 'Creative'
    },
    state: {
        type: String
    },
    questions: {
        [QuestionsSchema]
    }
});

/**
 * Validations
 */
// ReviewSchema.path('title').validate(function(title) {
//     return title.length;
// }, 'Title cannot be blank');

/**
 * Statics
 */
ReviewSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Review', ReviewSchema);
