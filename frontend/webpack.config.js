// Não é necessário entender ou modificar este arquivo.

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: [
                '@hashiprobr/react-create-state-context',
                '@hashiprobr/react-native-rounded-view',
                '@hashiprobr/react-native-aspect-view',
                '@hashiprobr/react-native-aspect-image',
                '@hashiprobr/react-native-paper-icon',
                '@hashiprobr/react-native-paper-dropdown',
                '@hashiprobr/react-native-paper-datetimepicker',
                '@hashiprobr/expo-pdf-reader',
                '@hashiprobr/expo-three-view',
                '@hashiprobr/expo-camera',
                '@hashiprobr/expo-use-camera',
            ],
        },
    }, argv);
    return config;
};
