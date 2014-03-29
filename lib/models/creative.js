'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  
/**
 * Review Schema
 */
var CreativeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
CreativeSchema.path('name').validate(function(name) {
    return name.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
CreativeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').populate('owner', 'name username email').exec(cb);
};

mongoose.model('Creative', CreativeSchema);
