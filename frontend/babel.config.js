// Não é necessário entender ou modificar este arquivo.

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
    };
};
