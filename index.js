const express = require('express');
const { loadDatabase } = require('./utils/dataLogic');

const app = express();
const port = 3000;

// Set EJS as View Engine
app.set('view engine', 'ejs');

// Static file view
app.use(express.static('public'));

app.get('/home', (req, res) => {
	let database = loadDatabase();
	res.render('home', { database });
});

app.get('/home/:id', (req, res) => {
	let database = loadDatabase();
	res.render('home', { database });
});

app.get('/detail', (req, res) => {
	res.render('dataDetail');
});

app.listen(port, () => {
	console.log(`Your App is running in port ${port}`);
});
