import React, { useState, useEffect } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { FAB, ActivityIndicator } from 'react-native-paper';

import useRest from '@hashiprobr/expo-use-rest';

import { map } from '../../tools';

import styles from '../../styles/cats/List.json';

export default function List(props) {
    const { navigation } = props;

    useEffect(async () => {
        let body;
        try {
            body = await client.get('/cat/list');
        } catch (error) {
            console.error(error);
        }
        if (body) {
            setCats(body);
        }
    }, []);

    const client = useRest('http://___.___.___.___:____');

    function renderCat(cat) {
        return (
            <View style={styles.item}>
            </View>
        )
    }

    function onPressFAB() {
        navigation.navigate('Form');
    }

    const [cats, setCats] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                {cats !== null && (
                    map(cats, renderCat)
                )}
            </ScrollView>
            <FAB style={styles.fab} icon="plus" onPress={onPressFAB} />
        </SafeAreaView >
    );
}
