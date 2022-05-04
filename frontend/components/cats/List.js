import React, { useState, useEffect } from 'react';

import { View, Image, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Title, Surface, FAB, TouchableRipple, ActivityIndicator } from 'react-native-paper';

import Icon from '@hashiprobr/react-native-paper-icon';

import useRest from '@hashiprobr/expo-use-rest';

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
    )
}

export default function List(props) {
    const { navigation, route } = props;

    const params = route.params;

    const [cats, setCats] = useState();

    const client = useRest(settings.url);

    useEffect(async () => {
        if (cats) {
            if (params) {
                let newCats;
                switch (params.action) {
                    case 'create':
                        newCats = [...cats, params.cat];
                        break;
                    case 'update':
                        newCats = [];
                        for (const cat of cats) {
                            if (cat.key === params.cat.key) {
                                newCats.push(params.cat);
                            } else {
                                newCats.push(cat);
                            }
                        }
                        setCats(newCats);
                        break;
                    case 'delete':
                        newCats = [];
                        for (const cat of cats) {
                            if (cat.key !== params.key) {
                                newCats.push(cat);
                            }
                        }
                        break;
                }
                setCats(newCats);
            }
        } else {
            let body;
            try {
                body = await client.get('/cat/list');
            } catch (error) {
                console.error(error);
            }
            if (body) {
                setCats(body);
            }
        }
    }, [params]);

    function onPress() {
        navigation.navigate('Form');
    }

    return (
        <SafeAreaView style={styles.container}>
            {cats ? (
                <ScrollView style={styles.scroll}>
                    {map(cats, (cat) => <Item cat={cat} navigation={navigation} />)}
                </ScrollView>
            ) : (
                <ActivityIndicator size="large" />
            )}
            <FAB style={styles.fab} icon="plus" onPress={onPress} />
        </SafeAreaView >
    );
}
