'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Creative = mongoose.model('Creative'),
 _ = require('lodash');


/**
 * Find creative by id
 */
 exports.creative = function(req, res, next, id) {
    Creative.load(id, function(err, creative) {
        if (err) return next(err);
        if (!creative) return next(new Error('Failed to load creative ' + id));
        req.creative = creative;
        next();
    });
};

/**
 * Create a creative
 */
 exports.create = function(req, res) {
    var creative = new Creative(req.body);
    creative.user = req.user;

    creative.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                creative: creative
            });
        } else {
            res.jsonp(creative);
        }
    });
};

/**
 * Update a creative
 */
 exports.update = function(req, res) {
    var creative = req.creative;

    creative = _.extend(creative, req.body);

    creative.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                creative: creative
            });
        } else {
            res.jsonp(creative);
        }
    });
};

/**
 * Delete an creative
 */
 exports.destroy = function(req, res) {
    var creative = req.creative;

    creative.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                creative: creative
            });
        } else {
            res.jsonp(creative);
        }
    });
};

/**
 * Show an creative
 */
 exports.show = function(req, res) {
    res.jsonp(req.creative);
};

/**
 * List of Creatives
 */
 exports.all = function(req, res) {
    Creative.find().sort('-created').populate('user', 'name username').exec(function(err, creatives) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {

            res.jsonp(creatives);
        }
    });
};
