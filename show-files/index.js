const fs = require('fs').promises;
const pathModule = require('path');
const path = process.argv.slice(2)[0];

const processDir = async (path, parent) => {
    try {
        const names = await fs.readdir(path);
        const statPromises = names.map(name => fs.lstat(pathModule.join(path, name)));
        const stats = await Promise.all(statPromises);
        const subDirPromise = stats.map(stat => {
            const name = names[stats.indexOf(stat)]
            if (stat.isDirectory()) {
                if (!parent[name])
                    parent[name] = {};
                return processDir(pathModule.join(path, name), parent[name]);
            }
            parent[name] = true;
            return name;
        });
        await Promise.all(subDirPromise);
    }
    catch (err) {
        console.log(err)
    }
}

(async () => {
    try {
        const result = {};
        await processDir(path, result)
        console.log(result)
    }
    catch (err) {
        console.log(err);
    }
})();
