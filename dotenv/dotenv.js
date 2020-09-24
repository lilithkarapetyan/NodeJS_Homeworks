const lineByLine = require('n-readlines');
const config = (path = './.env') => {
    const ret = {
        parsed: {},
        error: {},
    };

    try {
        const liner = new lineByLine(path);

        let line;
        while (line = liner.next()) {
            if (line) {
                line = line.toString().replace(/\r?\n|\r/g, '');
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key] = value;
                    ret.parsed[key] = value;
                }
            }
        }

        delete ret.error;
    } catch (err) {
        ret.error = err;
        delete ret.parsed;
    }
    return ret;
};

module.exports = {
    config,
};