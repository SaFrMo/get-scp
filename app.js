"use strict";

const	jsdom		= require('jsdom'),
		express		= require('express'),
		app			= express(),
		router		= express.Router(),
		mongoose	= require('mongoose'),
		scpEntry	= require('./app/models/scp-entry');
// TODO: Use cheerio instead of jsdom
		
mongoose.connect('mongodb://heroku_vz0kc1kv:up2to1q6n74h57pmdikv99f5lb@ds149437.mlab.com:49437/heroku_vz0kc1kv');

router.get('/', (req, res) => {
	res.send('get-scp is up and running! Try entering a number after the "/" in the URL.');
});

router.route('/:index')

	// Get an entry
	.get( (req, res) => {
	
		// resolveArticle().then(data => res.json({ message: 'worked!', data: data})).catch((err, data) => res.json({ message: err, data: data });
		
		scpEntry.findOne( {'number': `${req.params.index}`}, 'entry').exec().then(entry => {
			
			// We don't have an existing entry, so create one
			if( entry == null ){
				createMLabEntry(req.params.index).then(newEntry => {
					res.json({
						message: `Created entry for ${req.params.index}!`,
						data: newEntry
					});
				}).catch(err => console.log(err))
			} else {
				res.json({
					message: 'Success!',
					data: entry
				});
			}
			
		}).catch(err => {
			return res.json({
				message: err
			});
		})
		
	})
	
	// Create an entry
	.post( (req, res) => {
		
		createMLabEntry();
		
	}
);

// Get an entry from the actual SCP Wiki
const getWikiEntry = (index) => {
	
	return new Promise(function(resolve, reject){
	
		jsdom.env(
			`http://www.scp-wiki.net/scp-${index}`,
			["https://code.jquery.com/jquery-3.1.1.min.js"],
			function (err, window) {
				if ( err ) return reject(err);

				// Find main content
				let $content = window.$('#page-content');
				// Strip out all inline styling
				$content.find('*').attr('style', '');
				// Return bare-bones content
				return resolve($content.html());
				// TODO: Error handling
			}
		);
	
	});
	
};

const createMLabEntry = (index) => {
	return getWikiEntry(index).then(data => {
		let entry = new scpEntry();
		entry.number = index;
		entry.entry = data;

		return entry.save().exec();
	}).catch(err => console.log(err))
};

app.use('/', router);

app.listen( process.env.PORT || 5000 , () => {
	console.log(`Listening on ${process.env.PORT || 5000}`);
});
