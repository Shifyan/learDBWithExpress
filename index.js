const express = require('express');
const { loadDatabase, findData, addData } = require('./utils/dataLogic');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/home', (req, res) => {
	let database = loadDatabase();
	res.render('home', { database });
});

app.get('/addData', (req, res) => {
	res.render('addData');
});
app.post('/home', (req, res) => {
	let rawData = req.body;
	const newData = Object.assign({}, rawData);
	addData(newData);
	res.render('inputSuccess');
});
app.get('/home/:nama', (req, res) => {
	let myData = findData(req.params.nama);
	res.render('dataDetail', { myData });
});

app.use((req, res) => {
	res.status(404);
	res.send('<h1>Halaman Tidak Ditemukan</h1>');
});
// Static file view
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
	console.log(`Your App is running in port ${port}`);
});
