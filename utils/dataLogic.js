const fs = require('fs');

const dataPath = './data/database.json';
if (!fs.existsSync(dataPath)) {
	fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadDatabase = () => {
	const data = fs.readFileSync(dataPath, 'utf-8');
	const dataFromJson = JSON.parse(data);
	return dataFromJson;
};

const findData = (nama) => {
	const data = loadDatabase();
	const myData = data.find(
		(data) => data.nama.toLowerCase() === nama.toLowerCase(),
	);
	return myData;
};

const saveData = (data) => {
	fs.writeFileSync(dataPath, JSON.stringify(data));
};

const addData = (data) => {
	const oldData = loadDatabase();
	oldData.push(data);
	saveData(oldData);
};
const cekDuplikat = (value) => {
	const data = loadDatabase();
	// cek data melalui pencocokan v.nama dengan value(nama) yang dikirimkan
	return data.find((v) => v.nama === value);
};

const deleteData = (value) => {
	const data = loadDatabase();
	const dataFilter = data.filter((thisData) => thisData.nama !== value);
	saveData(dataFilter);
};
module.exports = { loadDatabase, findData, addData, cekDuplikat, deleteData };
