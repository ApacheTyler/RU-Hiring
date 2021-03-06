'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Resume = mongoose.model('Resume'),
	_ = require('lodash');

var getUserResumeAndDelete = function(req, res){
    return Resume.find().select('user').where({'user': req.user.id}).remove().exec(function(err, resumes){
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            console.log(resumes + 'deleted');
        }
    });
};

/**
 * Create a Resume
 */
exports.create = function(req, res) {

    //Delete old resume if already exist
    getUserResumeAndDelete(req, res);

    var resume = new Resume(req.body);
	resume.user = req.user;

	resume.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            console.log("succeeded in creating");
			res.jsonp(resume);
		}
	});
};

/**
 * Show the current Resume
 */
exports.read = function(req, res) {
	res.jsonp(req.resume);
};

/**
 * Update a Resume
 */
exports.update = function(req, res) {
	var resume = //req.resume ;
        Resume.find().select('user').where({'user': req.user.id}).exec(function(err, resume){
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                return resume;
            }
        });


	resume = _.extend(resume , req.body);

	resume.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resume);
		}
	});
};

/**
 * Delete an Resume
 */
exports.delete = function(req, res) {
	var resume = req.resume ;

	resume.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resume);
		}
	});
};

/**
 * List of Resumes
 */
exports.list = function(req, res) { Resume.find().sort('-created').populate('user', 'displayName').exec(function(err, resumes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(resumes);
		}
	});
};

exports.listAll = function(req, res) { Resume.find().sort('-created').populate('user', 'displayName').exec(function(err, resumes) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(resumes);
        }
    });
};

/**
 * Resume middleware
 */
exports.resumeByID = function(req, res, next, id) { Resume.findById(id).populate('user', 'displayName').exec(function(err, resume) {
		if (err) return next(err);
		if (! resume) return next(new Error('Failed to load Resume ' + id));
		req.resume = resume ;
		next();
	});
};

/**
*Gets user resume for single user
**/
exports.userResume = function(req, res) {
        Resume.findOne().where('user').equals(req.user.id).populate('user', 'displayName').exec(function(err, resume) {

        if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
        if(resume === null){
            resume = new Resume();
        }
        res.jsonp(resume);
    });
};

/**
 * Resume authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.resume.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
