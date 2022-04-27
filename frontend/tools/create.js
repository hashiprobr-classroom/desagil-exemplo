// Não é necessário entender ou modificar este arquivo.

const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

function split(arg) {
    const parts = arg.split('/').filter((part) => part !== '' && part !== '.');
    const name = parts.join('/');
    const dirname = path.dirname(name);
    let basename = path.basename(name);
    const lower = basename.toLowerCase();
    let code = lower.charCodeAt(0);
    if (code < 97 || code > 122) {
        throw new Error('Basename must start with a letter');
    }
    for (let i = 1; i < lower.length; i++) {
        code = lower.charCodeAt(i);
        if (code < 48 || (code > 57 && code < 97) || code > 122) {
            throw new Error('Basename must have only letters or digits');
        }
    }
    basename = `${lower.charAt(0).toUpperCase()}${basename.slice(1)}`;
    return [dirname, basename];
}

function mkdir(outPath) {
    let option = 'y';
    if (fs.existsSync(outPath)) {
        do {
            option = prompt(`Overwrite ${outPath}? (y/n) `);
        } while (option !== 'y' && option !== 'n');
    }
    if (option === 'y') {
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        return true;
    } else {
        return false;
    }
}

module.exports = { split, mkdir };
