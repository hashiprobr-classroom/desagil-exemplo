// Não é necessário entender ou modificar este arquivo.

const fs = require('fs');
const path = require('path');

const { split, mkdir } = require('../tools/create');

const COMPONENT_ROOT = 'components';

try {
    const argv = process.argv;

    if (argv.length < 3) {
        throw new Error('Missing path');
    }
    if (argv.length < 4) {
        throw new Error('Missing type');
    }
    if (argv.length > 4) {
        throw new Error('Too many arguments');
    }

    const [dirname, basename] = split(argv[2]);

    const context = {
        '{name}': basename,
        '{type}': argv[3].toLowerCase(),
    };

    switch (context['{type}']) {
        case 'stack':
            context['{base}'] = 'Stack';
            break;
        case 'drawer':
            context['{base}'] = 'Drawer';
            break;
        case 'material-top-tabs':
            context['{base}'] = 'MaterialTopTab';
            break;
        case 'material-bottom-tabs':
            context['{base}'] = 'MaterialBottomTab';
            break;
        default:
            throw new Error('Type must be stack, drawer, material-top-tabs, or material-bottom-tabs');
    }

    const name = `${basename}.js`;
    let parts;
    if (dirname === '.') {
        parts = [COMPONENT_ROOT, name];
    } else {
        parts = [COMPONENT_ROOT, dirname, name];
    }
    const outPath = parts.join(path.sep);

    const inPath = ['templates', 'Navigation.tpl'].join(path.sep);
    const template = fs.readFileSync(inPath, { encoding: 'utf8' });
    const regex = /(\{name\}|\{type\}|\{base\})/g;
    const content = template.replace(regex, (match) => context[match]);

    if (mkdir(outPath)) {
        fs.writeFileSync(outPath, content);
    }
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}
