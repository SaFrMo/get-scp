"use strict";

const	http		= require('http'),
		express		= require('express'),
		app			= express();

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.listen(3000, () => {
	console.log('Listening on 3000');
});






const getScp = function( index ){
	
	index = index || process.env.npm_config_index || process.env.npm_config_i || 1440;
	
	// Search cache for saved SCP
	// If we have a saved version, try to check for any updates
	
	// If we don't have a cached version
	let options = {
		host: 'www.scp-wiki.net',
		path: `/scp-${index}`
	}
	
	// Make request
	let request = http.request(options, (res) => {
		
		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		});
		res.on('end', () => {
			console.log(data);
		});
		
	});
	
	request.on('error', (err) => {
		console.log(err.message);
	});
	
	request.end();
	
	console.log(options.path);	
}