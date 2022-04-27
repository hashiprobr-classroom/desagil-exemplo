import React from 'react';

import { create{base}Navigator } from '@react-navigation/{type}';

import { useTheme } from '@react-navigation/native';

const {base} = create{base}Navigator();

export default function {name}(props) {
    const theme = useTheme();

    return (
        <{base}.Navigator initialRouteName="" screenOptions={theme.screenOptions}>
        </{base}.Navigator>
    );
}
