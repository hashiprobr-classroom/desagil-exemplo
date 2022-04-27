import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Button, ActivityIndicator } from 'react-native-paper';

import useLocator from '@hashiprobr/expo-use-locator';

import styles from '../styles/Locator.json';

export default function Locator(props) {
    const [coords, setCoords] = useState(null);

    const locator = useLocator();

    async function onPress() {
        let location;
        try {
            location = await locator.read();
        } catch (error) {
            console.error(error);
        }
        setCoords(location.coords);
    }

    return (
        <SafeAreaView style={styles.container}>
            {locator.reading ? (
                <ActivityIndicator style={styles.indicator} />
            ) : (
                coords && (
                    <Text style={styles.text}>{coords.latitude}, {coords.longitude}</Text>
                )
            )}
            <Button onPress={onPress}>Read</Button>
        </SafeAreaView>
    );
}
