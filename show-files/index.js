const fs = require('fs').promises;
const pathModule = require('path');
const path = process.argv.slice(2)[0];

const processDir = (path, parent) => {
    return new Promise((res, rej) => {
        fs.readdir(path).then( names => {
            const statPromises = names.map(name => fs.lstat(pathModule.join(path, name)));
            Promise.all(statPromises).then(stats => {
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
                Promise.all(subDirPromise).then((data) => {
                    res(data)
                }).catch(rej);
            }).catch(rej);
        }).catch(rej);
    });
}

const result = {};
processDir(path, result).then(() => {
    console.log(result)
})
