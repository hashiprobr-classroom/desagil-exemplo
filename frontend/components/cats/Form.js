import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, TextInput } from 'react-native-paper';

import DropDown from '@hashiprobr/react-native-paper-dropdown';
import { DateTimePicker } from '@hashiprobr/react-native-paper-datetimepicker';

import useRest from '@hashiprobr/expo-use-rest';

import styles from '../../styles/cats/Form.json';

export default function Form(props) {
    const { navigation, route } = props;

    const params = route.params;

    const list = [
        { label: 'Yellow', value: 'YELLOW' },
        { label: 'Green', value: 'GREEN' },
        { label: 'Blue', value: 'BLUE' },
    ];

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [eye, setEye] = useState('');
    const [birth, setBirth] = useState(new Date());

    useEffect(() => {
        const title = params ? params.name : 'Add new cat';

        navigation.setOptions({ title: title });

    }, [params]);

    const client = useRest('http://___.___.___.___:____');

    function onChangeName(text) {
        setName(text);
    }

    function onChangeBreed(text) {
        setBreed(text);
    }

    function onChangeEye(value) {
        setEye(value);
    }

    function onChangeBirth(date) {
        setBirth(date);
    }

    async function onPressAdd() {
        const cat = {
            name: name,
            breed: breed,
            eye: eye,
            birth: birth.getTime(),
        };

        let key;
        try {
            key = await client.post('/cat', cat);
        } catch (error) {
            console.error(error);
        }

        if (key) {
            console.log(key);
            navigation.navigate('List');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input} label="Name" value={name} onChangeText={onChangeName} />

            <TextInput style={styles.input} label="Breed" value={breed} onChangeText={onChangeBreed} />

            <DropDown style={styles.input} list={list} label="Eye" value={eye} onChangeValue={onChangeEye} />

            <DateTimePicker style={styles.input} type="date" label="Birth" value={birth} onChangeDate={onChangeBirth} />

            <Button mode="outlined" onPress={onPressAdd}>Add</Button>
        </SafeAreaView>
    );
}
