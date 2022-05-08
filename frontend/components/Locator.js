import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, Text, Button } from 'react-native-paper';

import useLocator from '@hashiprobr/expo-use-locator';

import styles from '../styles/Locator.json';

export default function Locator(props) {
    const [coords, setCoords] = useState();

    const locator = useLocator();

    async function onPressRead() {
        let location;
        try {
            location = await locator.read();
            setCoords(location.coords);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {locator.reading ? (
                <ActivityIndicator style={styles.content} />
            ) : (
                coords && (
                    <Text style={styles.content}>{coords.latitude}, {coords.longitude}</Text>
                )
            )}
            <Button onPress={onPressRead}>Read</Button>
        </SafeAreaView>
    );
}
