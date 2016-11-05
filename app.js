"use strict";

const	http		= require('http'),
		async		= require('async'),
		express		= require('express'),
		app			= express();

app.get('/', (req, res) => {
	res.send('get-scp is up and running! Try entering a number after the "/" in the URL.');
});

app.get('/:index', (req, res) => {

	let index = req.params.index;

	// Search cache for saved SCP
	// If we have a saved version, try to check for any updates
	
	// If we don't have a cached version
	let options = {
		host: 'www.scp-wiki.net',
		path: `/scp-${index}`
	}
	
	// Make request
	let request = http.request(options, (httpResponse) => {
		
		console.log('Loading');
		
		let data = '';
		httpResponse.on('data', (chunk) => {
			data += chunk;
			console.log('Loading...');
		});
		httpResponse.on('end', () => {
			res.send(data);
		});
		
	});
	
	request.on('error', (err) => {
		console.log(err.message);
		request.end();
	});
	
	request.end();
	
});

app.listen(3000, () => {
	console.log('Listening on 3000');
});