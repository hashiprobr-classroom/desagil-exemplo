// Não é necessário entender ou modificar este arquivo.

const fs = require('fs');
const path = require('path');

const { split, mkdir } = require('../tools/create');

const COMPONENT_ROOT = 'components';
const STYLE_ROOT = 'css';

try {
    const argv = process.argv;

    if (argv.length < 3) {
        throw new Error('Missing path');
    }
    if (argv.length > 3) {
        throw new Error('Too many arguments');
    }

    const [dirname, basename] = split(argv[2]);

    const context = {
        '{name}': basename,
    };

    let name, parts, outPath, inPath;

    name = `${basename}.js`;
    const prefix = ['..'];
    const suffix = ['styles'];
    if (dirname === '.') {
        parts = [COMPONENT_ROOT, name];
    } else {
        parts = [COMPONENT_ROOT, dirname, name];
        for (const part of dirname.split(path.sep)) {
            prefix.push('..');
            suffix.push(part);
        }
    }
    outPath = parts.join(path.sep);
    context['{prefix}'] = prefix.join('/');
    context['{suffix}'] = suffix.join('/');

    inPath = ['templates', 'Component.tpl'].join(path.sep);
    const template = fs.readFileSync(inPath, { encoding: 'utf8' });
    const regex = /(\{name\}|\{prefix\}|\{suffix\})/g;
    const content = template.replace(regex, (match) => context[match]);

    if (mkdir(outPath)) {
        fs.writeFileSync(outPath, content);
    }

    name = `${basename}.css`;
    if (dirname === '.') {
        parts = [STYLE_ROOT, name];
    } else {
        parts = [STYLE_ROOT, dirname, name];
    }
    outPath = parts.join(path.sep);

    inPath = ['templates', 'Component.css'].join(path.sep);

    if (mkdir(outPath)) {
        fs.copyFileSync(inPath, outPath);
    }
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}
