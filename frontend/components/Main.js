import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useTheme } from '@react-navigation/native';

import Icon from '@hashiprobr/react-native-paper-icon';

import Cats from './cats/Cats';
import Camera from './Camera';
import Scanner from './Scanner';
import Locator from './Locator';

const MaterialBottomTab = createMaterialBottomTabNavigator();

export default function Main(props) {
    const theme = useTheme();

    return (
        <MaterialBottomTab.Navigator initialRouteName="Cats" screenOptions={theme.screenOptions}>
            <MaterialBottomTab.Screen name="Cats" component={Cats} options={{ tabBarIcon: ({ color }) => <Icon name="cat" color={color} /> }} />
            <MaterialBottomTab.Screen name="Camera" component={Camera} options={{ tabBarIcon: ({ color }) => <Icon name="camera" color={color} /> }} />
            <MaterialBottomTab.Screen name="Scanner" component={Scanner} options={{ tabBarIcon: ({ color }) => <Icon name="barcode-scan" color={color} /> }} />
            <MaterialBottomTab.Screen name="Locator" component={Locator} options={{ tabBarIcon: ({ color }) => <Icon name="crosshairs-gps" color={color} /> }} />
        </MaterialBottomTab.Navigator>
    );
}
