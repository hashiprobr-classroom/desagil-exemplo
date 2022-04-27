// Não é necessário entender ou modificar este arquivo.

import 'react-native-gesture-handler';

import merge from 'deepmerge';

import React from 'react';

import { Platform } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';

import { DateTimeContainer } from '@hashiprobr/react-native-paper-datetimepicker';

import AppLoading from 'expo-app-loading';

import { provide, getFonts, useStyles, useDark, DarkContext, ErrorBoundary } from './tools';

import CustomDefaultTheme from './themes/DefaultTheme';
import CustomDarkTheme from './themes/DarkTheme';

import Main from './components/Main';

if (Platform.OS === 'web') {
    const warn = console.warn;
    console.warn = (warning) => {
        if (typeof warning !== 'string' || warning.indexOf('RCTAnimation') === -1) {
            warn(warning);
        }
    };
}

const fonts = getFonts();

const defaultTheme = merge.all([NavigationDefaultTheme, PaperDefaultTheme, CustomDefaultTheme]);
const darkTheme = merge.all([NavigationDarkTheme, PaperDarkTheme, CustomDarkTheme]);

function App() {
    const loaded = useStyles(fonts);

    const dark = useDark();

    const theme = dark[0] ? darkTheme : defaultTheme;

    return (
        loaded.every((value) => value) ? provide(
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <NavigationContainer theme={theme}>
                        <DateTimeContainer theme={theme}>
                            <Main />
                        </DateTimeContainer>
                    </NavigationContainer>
                </SafeAreaProvider>
            </PaperProvider >
        ) : (
            <AppLoading />
        )
    );
}

export default function BoundedApp() {
    return (
        <ErrorBoundary>
            <DarkContext.Provider>
                <App />
            </DarkContext.Provider>
        </ErrorBoundary>
    );
}
