import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Button } from 'react-native-paper';

import useScanner from '@hashiprobr/expo-use-scanner';

import styles from '../styles/Scanner.json';

export default function Scanner(props) {
    const [data, setData] = useState();

    const [scanner, Preview] = useScanner();

    async function onPressScan() {
        try {
            await scanner.activate();
        } catch (error) {
            console.error(error);
        }
    }

    function onPressCancel() {
        scanner.deactivate();
    }

    function onBarCodeScanned(result) {
        setData(result.data);
        scanner.deactivate();
    }

    return (
        <SafeAreaView style={styles.container}>
            {scanner.active ? (
                <Preview style={styles.preview} onBarCodeScanned={onBarCodeScanned}>
                    <Button mode="contained" onPress={onPressCancel}>Cancel</Button>
                </Preview>
            ) : (
                <>
                    {data && (
                        <Text style={styles.text}>{data}</Text>
                    )}
                    <Button onPress={onPressScan}>Scan</Button>
                </>
            )}
        </SafeAreaView>
    );
}
