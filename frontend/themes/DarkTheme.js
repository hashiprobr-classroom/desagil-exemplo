// https://reactnavigation.org/docs/themes/#basic-usage
// https://github.com/react-navigation/react-navigation/blob/main/packages/native/src/theming/DarkTheme.tsx
// https://reactnavigation.org/docs/headers/#adjusting-header-styles

// https://callstack.github.io/react-native-paper/theming.html#applying-a-theme-to-the-whole-app
// https://github.com/callstack/react-native-paper/blob/main/src/styles/DarkTheme.tsx
// https://github.com/callstack/react-native-paper/blob/main/src/styles/colors.tsx

import DefaultTheme from './DefaultTheme';

export default {
    ...DefaultTheme,
    dark: true,
    mode: 'adaptive',
    colors: {
        primary: '#BB86FC',
        accent: '#03dac6',
        background: '#121212',
        surface: '#121212',
        error: '#CF6679',
        card: 'rgb(18, 18, 18)',
        text: '#ffffff',
        disabled: 'rgba(255, 255, 255, 0.38)',
        placeholder: 'rgba(255, 255, 255, 0.54)',
        backdrop: 'rgba(0, 0, 0, 0.5)',
        onSurface: '#FFFFFF',
        border: 'rgb(39, 39, 41)',
        notification: '#ff80ab',
    },
    screenOptions: {
        ...DefaultTheme.screenOptions,
        headerStyle: {
            backgroundColor: '#BB86FC',
        },
        headerTintColor: '#000000',
    },
};
