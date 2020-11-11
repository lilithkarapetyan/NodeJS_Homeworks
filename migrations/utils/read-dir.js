
const fs = require('fs').promises;
const pathModule = require('path');
const path = process.argv.slice(2)[0];

const readDir = (path, parent) => {
    return new Promise((res, rej) => {
        return fs.readdir(path).then( names => {
            const statPromises = names.map(name => fs.lstat(pathModule.join(path, name)));
            return Promise.all(statPromises).then(stats => {
                const subDirPromise = stats.map(stat => {
                    const name = names[stats.indexOf(stat)]
                    if (stat.isDirectory()) {
                        if (!parent[name])
                            parent[name] = {};
                        return processDir(pathModule.join(path, name), parent[name]);
                    }
                    parent[name] = true;
                    return name;
                })
                return Promise.all(subDirPromise).then((data) => {
                    res(data)
                });
            });
        }).catch(rej);
    });
}

module.exports = readDir;