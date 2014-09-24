'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Resume Schema
 */
var ResumeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Enter your name',
		trim: true
	},
    gender: {
        type: String,
        default: '',
        required: 'Enter your gender',
        trim: true
    },
    rank: {
        type: String,
        default: '',
        required: 'Enter your class rank',
        trim: true
    },
    classes: {
        type: Array,
        default: {},
        required: 'Select all classes taken'
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    workHistory: {
        type: Array,
        default: {},
    },
    quote: {
        type: String,
        default: '',
        trim: true
    },
    picture: {
        type: String,
        default: '',
        trim: true
    }, 
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Resume', ResumeSchema);
