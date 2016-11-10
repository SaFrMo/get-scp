"use strict";

const	mongoose	= require('mongoose'),
		Schema		= mongoose.Schema;
		
const EntrySchema	= new Schema({
	number: String,
	entry: String,
	lastEdited: Date
});

module.exports = mongoose.model('Entry', EntrySchema);