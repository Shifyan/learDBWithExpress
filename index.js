const express = require('express');
const { loadDatabase, findData } = require('./utils/dataLogic');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as View Engine
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
	let database = loadDatabase();
	res.render('home', { database });
});

app.get('/addData', (req, res) => {
	res.render('addData');
});

app.get('/home/:nama', (req, res) => {
	let myData = findData(req.params.nama);
	// console.log(req.params.nama);
	res.render('dataDetail', { myData });
});

// Static file view
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
	console.log(`Your App is running in port ${port}`);
});
