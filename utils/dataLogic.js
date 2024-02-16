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

// console.log(findData('Shifyan'));

module.exports = { loadDatabase, findData };
