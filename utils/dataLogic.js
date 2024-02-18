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
module.exports = { loadDatabase, findData, addData };
