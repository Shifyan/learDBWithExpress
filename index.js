const express = require('express');
require('./utils/dbConnect');
const DataPonorogo = require('./utils/dbLogic');
const path = require('path');
const { body, validationResult } = require('express-validator');

// Inisiasi Express dan Pendefinisian Port
const app = express();
const port = 3000;

// Set EJS as View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Masuk ke Halaman Utama
app.get('/home', async (req, res) => {
	let database = await DataPonorogo.find();
	res.render('home', { database });
});

// Masuk ke Halaman Tambah Data
app.get('/addData', (req, res) => {
	res.render('addData');
});

// Mengambil Data dari Form Tambah Data dan Melakukan input ke MongoDB
app.post(
	'/home',
	body('nama').custom(async (value) => {
		let dataDuplikat = await DataPonorogo.findOne({ nama: value });
		if (dataDuplikat) {
			throw new Error('Nama Sudah Terdaftar');
		}
		return true;
	}),
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			res.status(400).json({ error: err.array() });
		} else {
			let rawData = req.body;
			const newData = Object.assign({}, rawData);
			await DataPonorogo.insertMany(newData);
			// addData(newData);
			res.render('inputSuccess');
		}
	},
);

// Melakukan Delete Data
app.get('/home/delete/:nama', async (req, res) => {
	let myData = await DataPonorogo.findOne({ nama: req.params.nama });
	if (!myData) {
		res.status(404);
		res.send('404');
	} else {
		await DataPonorogo.findOneAndDelete({ nama: req.params.nama });
		res.redirect('/home');
	}
});

// Melakukan POST Update Data
app.post('/home/update', async (req, res) => {
	await DataPonorogo.updateOne(
		{ nama: req.body.oldNama },
		{ nama: req.body.nama, alamat: req.body.alamat, noHp: req.body.noHp },
	);
	res.redirect('/home');
});

// Masuk ke Halaman Ubah Data
app.get('/home/ubahData/:nama', async (req, res) => {
	let myData = await DataPonorogo.findOne({ nama: req.params.nama });
	res.render('ubahData', { myData });
});

// Masuk ke Halaman Detail
app.get('/home/:nama', async (req, res) => {
	let myData = await DataPonorogo.findOne({ nama: req.params.nama });
	res.render('dataDetail', { myData });
});

// Middleware Jika User Masuk ke Rute yang Salah
app.use((req, res) => {
	res.status(404);
	res.send('<h1>Halaman Tidak Ditemukan</h1>');
});

// Static file view
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
	console.log(`Your App is running in port ${port}`);
});
