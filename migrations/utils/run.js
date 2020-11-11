const readQuery = require('./read-query');

const getVersion = () => readQuery(__dirname+'/queries/get_version.sql');
const updateVersion = (version) => readQuery(__dirname+'/queries/update_version.sql') + version;
const useDB = () => readQuery(__dirname+'/queries/use_db.sql');
const createDB = () => readQuery(__dirname+'/queries/db_create.sql');

module.exports = {
    getVersion,
    updateVersion,
    useDB,
    createDB,
};
