"use strict";

const	jsdom		= require('jsdom'),
		express		= require('express'),
		app			= express();

app.get('/', (req, res) => {
	res.send('get-scp is up and running! Try entering a number after the "/" in the URL.');
});

app.get('/:index', (req, res) => {

	jsdom.env(
		`http://www.scp-wiki.net/scp-${req.params.index}`,
		["http://code.jquery.com/jquery.js"],
		function (err, window) {
			// Find main content
			let $content = window.$('#page-content');
			// Strip out all inline styling
			$content.find('*').attr('style', '');
			// Return bare-bones content
			res.send( $content.html() );
		}
	);

});

app.listen( process.env.PORT || 5000 , () => {
	console.log(`Listening on ${process.env.PORT || 5000}`);
});