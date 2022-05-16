import React, { useState, useEffect } from 'react';

import { Image, View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { TouchableRipple, Surface, Title, Text, ActivityIndicator, Button, FAB, Snackbar } from 'react-native-paper';

import Icon from '@hashiprobr/react-native-paper-icon';

import useRest from '@hashiprobr/react-native-use-rest';

import { map } from '../../tools';

import settings from '../../settings.json';

import styles from '../../styles/cats/List.json';

function Item(props) {
    const { cat, navigation } = props;

    const date = new Date(cat.birth);

    function onPress() {
        navigation.navigate('Form', { cat: cat });
    }

    return (
        <TouchableRipple style={styles.itemTouch} onPress={onPress}>
            <Surface style={styles.itemSurface}>
                {cat.photo === null ? (
                    <Icon style={styles.itemImage} name="cat" />
                ) : (
                    <Image style={styles.itemImage} source={{ uri: cat.photo }} />
                )}
                <View style={styles.itemView}>
                    <Title>{cat.name}</Title>
                    <Text>{cat.breed} born in {date.toLocaleDateString()}</Text>
                </View>
            </Surface>
        </TouchableRipple>
    );
}

export default function List(props) {
    const { navigation, route } = props;

    const params = route.params;

    const [cats, setCats] = useState();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const client = useRest(settings.url);

    useEffect(() => {
        if (cats) {
            if (params) {
                let copy;
                switch (params.action) {
                    case 'create':
                        copy = [...cats, params.cat];
                        break;
                    case 'update':
                        copy = [];
                        for (const cat of cats) {
                            if (cat.key === params.cat.key) {
                                copy.push(params.cat);
                            } else {
                                copy.push(cat);
                            }
                        }
                        setCats(copy);
                        break;
                    case 'delete':
                        copy = [];
                        for (const cat of cats) {
                            if (cat.key !== params.key) {
                                copy.push(cat);
                            }
                        }
                        break;
                    default:
                        setMessage('Unknown action');
                        setError(true);
                }
                setCats(copy);
            }
        } else {
            load();
        }
    }, [params]);

    async function load() {
        let response;
        try {
            response = await client.get('/cat/list');
            setCats(response);
        } catch (error) {
            setMessage(error.message);
            setError(true);
        }
    }

    function onPressReload() {
        load();
    }

    function onPressCreate() {
        navigation.navigate('Form');
    }

    return (
        <>
            <SafeAreaView style={styles.container} edges={['top']}>
                {cats ? (
                    <ScrollView style={styles.outerScroll} contentContainerStyle={styles.innerScroll}>
                        {map(cats, (cat) => <Item cat={cat} navigation={navigation} />)}
                    </ScrollView>
                ) : (
                    client.running ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <Button onPress={onPressReload}>Reload</Button>
                    )
                )}
                <FAB style={styles.fab} icon="plus" onPress={onPressCreate} />
            </SafeAreaView >
            <Snackbar visible={error} action={{ label: 'Close', onPress: () => setError(false) }} onDismiss={() => { }}>
                {message}
            </Snackbar>
        </>
    );
}
