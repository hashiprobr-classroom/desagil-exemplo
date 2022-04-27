// https://reactnavigation.org/docs/themes/#basic-usage
// https://github.com/react-navigation/react-navigation/blob/main/packages/native/src/theming/DefaultTheme.tsx
// https://reactnavigation.org/docs/headers/#adjusting-header-styles
// https://github.com/react-navigation/react-navigation/blob/main/packages/elements/src/Header/HeaderTitle.tsx

// https://callstack.github.io/react-native-paper/theming.html#applying-a-theme-to-the-whole-app
// https://github.com/callstack/react-native-paper/blob/main/src/styles/DefaultTheme.tsx
// https://github.com/callstack/react-native-paper/blob/main/src/styles/colors.tsx
// https://github.com/callstack/react-native-paper/blob/main/src/styles/fonts.tsx

import { Platform } from 'react-native';

import { configureFonts } from 'react-native-paper';

export default {
    dark: false,
    roundness: 4,
    colors: {
        primary: '#6200ee',
        accent: '#03dac4',
        background: '#f6f6f6',
        surface: '#ffffff',
        error: '#B00020',
        card: 'rgb(255, 255, 255)',
        text: '#000000',
        disabled: 'rgba(0, 0, 0, 0.26)',
        placeholder: 'rgba(0, 0, 0, 0.54)',
        backdrop: 'rgba(0, 0, 0, 0.5)',
        onSurface: '#000000',
        border: 'rgb(216, 216, 216)',
        notification: '#f50057',
    },
    screenOptions: {
        headerStyle: {
            backgroundColor: '#6200ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: Platform.select({
            ios: {
                fontSize: 17,
                fontWeight: '600',
            },
            android: {
                fontSize: 20,
                fontFamily: 'sans-serif-medium',
                fontWeight: 'normal',
            },
            default: {
                fontSize: 18,
                fontWeight: '500',
            },
        }),
    },
    fonts: configureFonts({
        web: {
            regular: {
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: '400',
            },
            medium: {
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: '500',
            },
            light: {
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: '300',
            },
            thin: {
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: '100',
            },
        },
        ios: {
            regular: {
                fontFamily: 'System',
                fontWeight: '400',
            },
            medium: {
                fontFamily: 'System',
                fontWeight: '500',
            },
            light: {
                fontFamily: 'System',
                fontWeight: '300',
            },
            thin: {
                fontFamily: 'System',
                fontWeight: '100',
            },
        },
        default: {
            regular: {
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'sans-serif-medium',
                fontWeight: 'normal',
            },
            light: {
                fontFamily: 'sans-serif-light',
                fontWeight: 'normal',
            },
            thin: {
                fontFamily: 'sans-serif-thin',
                fontWeight: 'normal',
            },
        },
    }),
    animation: {
        scale: 1.0,
    },
};
