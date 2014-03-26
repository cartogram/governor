'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Review = mongoose.model('Review'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.review = function(req, res, next, id) {
    Review.load(id, function(err, review) {
        if (err) return next(err);
        if (!review) return next(new Error('Failed to load review ' + id));
        req.review = review;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var review = new Review(req.body);
    review.user = req.user;

    review.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                review: review
            });
        } else {
            res.jsonp(review);
        }
    });
};

/**
 * Update a review
 */
exports.update = function(req, res) {
    var review = req.review;

    review = _.extend(review, req.body);

    review.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                review: review
            });
        } else {
            res.jsonp(review);
        }
    });
};

/**
 * Delete an review
 */
exports.destroy = function(req, res) {
    var review = req.review;

    review.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                review: review
            });
        } else {
            res.jsonp(review);
        }
    });
};

/**
 * Show an review
 */
exports.show = function(req, res) {
    res.jsonp(req.review);
};

/**
 * List of Reviews
 */
exports.all = function(req, res) {
    Review.find().sort('-created').populate('user', 'name username').exec(function(err, reviews) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {


            res.jsonp(reviews);
        }
    });
};
