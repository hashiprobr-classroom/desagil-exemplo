// Não é necessário entender ou modificar este arquivo.

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

function write(inPath) {
    const specs = JSON.parse(fs.readFileSync(inPath, { encoding: 'utf8' }));
    const lines = ['// Não é necessário entender ou modificar este arquivo.', '\nexport default {'];
    for (const name in specs.dependencies) {
        if (name.startsWith('@expo-google-fonts/')) {
            lines.push(`    '${name.slice(19)}': require('${name}'),`);
        }
    }
    lines.push('};\n');
    const outPath = `scripts${path.sep}requireFonts.js`;
    fs.writeFileSync(outPath, lines.join('\n'));
}

chokidar.watch('package.json', { awaitWriteFinish: true })
    .on('add', (inPath) => {
        console.log(`Added ${inPath}`);
        write(inPath);
    })
    .on('change', (inPath) => {
        console.log(`Changed ${inPath}`);
        write(inPath);
    });
