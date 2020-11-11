const fs = require('fs');
const { sequelize } = require('./db');
const { readQuery } = require('./utils');

let query = readQuery('.utils/queries/db_create.sql');
sequelize.query(query).then(reults => {
    console.log(JSON.stringify(reults[0], null, 2));
}).catch(console.log);
