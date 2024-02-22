const mongoose = require('mongoose');

// Membuat Schema Awal
const dataSchema = new mongoose.Schema({
	nama: {
		type: String,
		required: true,
	},
	alamat: {
		type: String,
		required: true,
	},
	noHp: {
		type: String,
		required: true,
	},
});

// Membuat Model
const DataPonorogo = mongoose.model('DataPonorogo', dataSchema);

module.exports = DataPonorogo;
