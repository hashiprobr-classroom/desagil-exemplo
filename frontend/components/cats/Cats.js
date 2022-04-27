import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from '@react-navigation/native';

import List from './List';
import Form from './Form';

const Stack = createStackNavigator();

export default function Cats(props) {
    const theme = useTheme();

    return (
        <Stack.Navigator initialRouteName="List" screenOptions={theme.screenOptions}>
            <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
            <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
    );
}
