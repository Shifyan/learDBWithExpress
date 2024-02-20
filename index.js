const express = require('express');
const {
	loadDatabase,
	findData,
	addData,
	cekDuplikat,
	deleteData,
} = require('./utils/dataLogic');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// Set EJS as View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/home', (req, res) => {
	let database = loadDatabase();
	res.render('home', { database });
});

app.get('/addData', (req, res) => {
	res.render('addData');
});
app.post(
	'/home',
	body('nama').custom((value) => {
		let dataDuplikat = cekDuplikat(value);
		if (dataDuplikat) {
			throw new Error('Nama Sudah Terdaftar');
		}
		return true;
	}),
	(req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			res.status(400).json({ error: err.array() });
		} else {
			let rawData = req.body;
			const newData = Object.assign({}, rawData);
			addData(newData);
			res.render('inputSuccess');
		}
	},
);
app.get('/home/delete/:nama', (req, res) => {
	let myData = findData(req.params.nama);
	if (!myData) {
		res.status(404);
		res.send('404');
	} else {
		deleteData(req.params.nama);
		res.redirect('/home');
	}
});

app.post('/home/update', (req, res) => {
	console.log(req.body);
	res.redirect('/home/update');
});

app.get('/home/ubahData/:nama', (req, res) => {
	let myData = findData(req.params.nama);
	res.render('ubahData', { myData });
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
