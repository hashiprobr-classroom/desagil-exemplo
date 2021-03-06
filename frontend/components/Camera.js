import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from 'react-native-paper';

import AspectImage from '@hashiprobr/react-native-aspect-image';

import useCamera from '@hashiprobr/expo-use-camera';

import styles from '../styles/Camera.json';

export default function Camera(props) {
    const [uri, setUri] = useState();

    const [camera, Preview] = useCamera(true);

    async function onPressOpen() {
        try {
            await camera.activate();
        } catch (error) {
            console.error(error);
        }
    }

    async function onPressTake() {
        let source;
        try {
            source = await camera.take();
            camera.deactivate();
            setUri(source.uri);
        } catch (error) {
            console.error(error);
        }
    }

    function onPressClose() {
        camera.deactivate();
    }

    return (
        <SafeAreaView style={styles.container}>
            {camera.active ? (
                <Preview style={styles.preview}>
                    <Button mode="contained" onPress={onPressTake}>Take</Button>
                    <Button mode="contained" onPress={onPressClose}>Close</Button>
                </Preview>
            ) : (
                <>
                    {uri && (
                        <AspectImage style={styles.image} source={{ uri }} />
                    )}
                    <Button onPress={onPressOpen}>Open</Button>
                </>
            )}
        </SafeAreaView>
    );
}
