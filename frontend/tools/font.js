// Não é necessário entender ou modificar este arquivo.

import modules from '../scripts/requireFonts';

import GoogleFonts from '../themes/GoogleFonts';

function getFonts() {
    const fonts = [];
    if (typeof GoogleFonts !== 'object') {
        throw new TypeError('GoogleFonts must be an object');
    }
    if (GoogleFonts === null) {
        throw new Error('GoogleFonts cannot be null');
    }
    for (const [fontName, styleNames] of Object.entries(GoogleFonts)) {
        if (!(fontName in modules)) {
            throw new Error(`Package @expo-google-fonts/${fontName} is not installed`);
        }
        if (!Array.isArray(styleNames)) {
            throw new TypeError('GoogleFonts values must be arrays');
        }
        const styles = [];
        const module = modules[fontName];
        for (const styleName of styleNames) {
            if (!(styleName in module)) {
                throw new Error(`Font ${fontName} does not have style ${styleName}`);
            }
            styles[styleName] = module[styleName];
        }
        fonts.push([styles, module.useFonts]);
    }
    return fonts;
}

function useStyles(fonts) {
    const loaded = [];
    for (const [styles, useFonts] of fonts) {
        const value = useFonts(styles);
        loaded.push(value[0]);
    }
    return loaded;
}

export { getFonts, useStyles };
