// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var router = express.Router();
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

router.use('/now', (req, res) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		  d = new Date(),
		  data = {
			  unix: Date.now(),
			  natural: `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
		  };
	res.type('json').send(JSON.stringify(data, null, 1));
});
router.use('/:month%20:date,%20:year', (req, res) => {
	const months = {'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5, 'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11},
		  data = {
		  	  unix: Date.parse(`${req.params.month.slice(0, 3)} ${req.params.year}, ${req.params.date}`),
		  	  natural: `${req.params.month} ${req.params.date}, ${req.params.year}`
		  };
	if (isNaN(data.unix)) res.type('txt').send('Unvalid Argument');
	else res.type('json').send(JSON.stringify(data, null, ' '));
});
router.use('/:unix', (req, res) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		  d = new Date(+req.params.unix),
		  data = {
		  	  unix: req.params.unix,
		  	  natural: `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
		  };
	res.type('json').send(JSON.stringify(data, null, ' '));
});
app.use('/timestamp', router);
// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('404 - Page Not Found');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
