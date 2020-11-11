const fs = require('fs');
const sequelize = require('./db.js');
const { readQuery, readDir, run } = require('./utils');
const result = {};


readDir('./migrations', result).then(async () => {

    await sequelize.query(run.useDB());
    let db_v = await sequelize.query(run.getVersion());
    db_v = JSON.parse(JSON.stringify(db_v, null, 2))[0][0].db_v;

    for (let file in result) {
        const mig_v = +file.match(/\d+/).join('');
        console.log(mig_v, db_v);
        if (result[file] && mig_v > db_v) {
            console.log(`runing ${mig_v}`)
            const query = readQuery(__dirname + '/migrations/' + file);
            try {
                await sequelize.query(query);
                await sequelize.query(run.updateVersion(mig_v));
            }
            catch (err) {
                console.log(err);
            }
        }
    }
});