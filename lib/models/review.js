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
        type:Number,
        min: 0, 
        max: 10
    }
});
var StageSchema = new Schema({
    title: {
        type : String
    },
    total : {
        type:Number,
        min: 0, 
        max: 100
    },
    questions: [QuestionsSchema]
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
    stages: [StageSchema],
    rating: {
       type: Number 
    },
    totals: {
        first: { type: Number },
        second: { type: Number },
        third: { type: Number },
        fourth: { type: Number },
        fifth: { type: Number }

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
