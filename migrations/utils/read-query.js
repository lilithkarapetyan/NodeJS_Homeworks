const fs = require('fs');
const readQuery = (path) => fs.readFileSync(path)
    .toString()
    .split('')
    .filter(item => item != '\n')
    .join('');

module.exports = readQuery;