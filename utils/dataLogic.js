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

// console.log(loadDatabase());

module.exports = { loadDatabase };
