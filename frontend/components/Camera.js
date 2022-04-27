import React, { useState } from 'react';

import { View } from 'react-native';

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
        } catch (error) {
            console.error(error);
        }
        if (source) {
            camera.deactivate();
            setUri(source.uri);
        }
    }

    function onPressClose() {
        camera.deactivate();
    }

    return (
        <SafeAreaView style={styles.container}>
            {camera.active ? (
                <Preview style={styles.preview}>
                    <View style={styles.buttons}>
                        <Button mode="contained" onPress={onPressTake}>Take</Button>
                        <Button mode="contained" onPress={onPressClose}>Close</Button>
                    </View>
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
