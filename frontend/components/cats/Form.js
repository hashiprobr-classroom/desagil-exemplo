import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from 'react-native';

import { Text, Button, TextInput, HelperText, Snackbar, Dialog, ActivityIndicator, TouchableRipple } from 'react-native-paper';

import RoundedView from '@hashiprobr/react-native-rounded-view';
import Icon from '@hashiprobr/react-native-paper-icon';
import DropDown from '@hashiprobr/react-native-paper-dropdown';
import { DateTimePicker } from '@hashiprobr/react-native-paper-datetimepicker';

import usePicker from '@hashiprobr/expo-use-picker';
import useRest from '@hashiprobr/expo-use-rest';

import settings from '../../settings.json';

import styles from '../../styles/cats/Form.json';

export default function Form(props) {
    const { navigation, route } = props;

    const params = route.params;

    const list = [
        { label: 'Yellow', value: 'YELLOW' },
        { label: 'Green', value: 'GREEN' },
        { label: 'Blue', value: 'BLUE' },
    ];

    const [photo, setPhoto] = useState(params ? params.cat.photo : null);
    const [name, setName] = useState(params ? params.cat.name : '');
    const [nameError, setNameError] = useState(!validateName(name));
    const [breed, setBreed] = useState(params ? params.cat.breed : '');
    const [breedError, setBreedError] = useState(!validateBreed(breed));
    const [eye, setEye] = useState(params ? params.cat.eye : 'YELLOW');
    const [birth, setBirth] = useState(params ? new Date(params.cat.birth) : new Date());
    const [confirming, setConfirming] = useState(false);
    const [clientMessage, setClientMessage] = useState('');
    const [clientError, setClientError] = useState(false);

    const picker = usePicker();

    const client = useRest(settings.url);

    useEffect(() => {
        let title;
        if (params) {
            title = params.cat.name;
        } else {
            title = 'New cat';
        }
        navigation.setOptions({ title: title });
    }, [params]);

    function validateName(text) {
        if (text.length === 0) {
            return false;
        }
        return true;
    }

    function validateBreed(text) {
        if (text.length === 0) {
            return false;
        }
        return true;
    }

    async function onPressPhoto() {
        try {
            const result = await picker.load('image/*');
            setPhoto(result);
        } catch (error) {
            setClientMessage(error.message);
            setClientError(true);
        }
    }

    function onChangeName(text) {
        setName(text);
        setNameError(!validateName(text));
    }

    function onChangeBreed(text) {
        setBreed(text);
        setBreedError(!validateBreed(text));
    }

    function onChangeEye(value) {
        setEye(value);
    }

    function onChangeBirth(date) {
        setBirth(date);
    }

    async function onPressCreate() {
        const cat = {
            name: name,
            breed: breed,
            eye: eye,
            photo: null,
            birth: birth.getTime(),
        };

        try {
            cat.key = await client.post('/cat', cat);
            navigation.navigate('List', { action: 'create', cat: cat });
        } catch (error) {
            setClientMessage(error.message);
            setClientError(true);
        }
    }

    async function onPressUpdate() {
        const cat = {
            key: params.cat.key,
            name: name,
            breed: breed,
            eye: eye,
            photo: null,
            birth: birth.getTime(),
        };

        try {
            await client.put('/cat', cat);
            navigation.navigate('List', { action: 'update', cat: cat });
        } catch (error) {
            setClientMessage(error.message);
            setClientError(true);
        }
    }

    function onPressDelete() {
        setConfirming(true);
    }

    function onDismissDelete() {
        setConfirming(false);
    }

    async function onConfirmDelete() {
        try {
            await client.delete('/cat?key=' + params.cat.key);
            navigation.navigate('List', { action: 'delete', key: params.cat.key });
        } catch (error) {
            setClientMessage(error.message);
            setClientError(true);
        }
        setConfirming(false);
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <TouchableRipple style={styles.photo} onPress={onPressPhoto}>
                    {picker.loading ? (
                        <ActivityIndicator style={styles.image} size="large" />
                    ) : (
                        photo === null ? (
                            <Icon name="cat" />
                        ) : (
                            <RoundedView style={styles.image}>
                                <Image style={styles.image} source={{ uri: photo }} />
                            </RoundedView>
                        )
                    )}
                </TouchableRipple>

                <TextInput style={styles.input} label="Name" value={name} onChangeText={onChangeName} error={nameError} />
                {nameError && (
                    <HelperText style={styles.error} type="error">Name cannot be blank</HelperText>
                )}

                <TextInput style={styles.input} label="Breed" value={breed} onChangeText={onChangeBreed} error={breedError} />
                {breedError && (
                    <HelperText style={styles.error} type="error">Breed cannot be blank</HelperText>
                )}

                <DropDown style={styles.input} list={list} label="Eye" value={eye} onChangeValue={onChangeEye} />

                <DateTimePicker style={styles.input} type="date" label="Birth" value={birth} onChangeDate={onChangeBirth} />

                <Button style={styles.button} mode="outlined" onPress={params ? onPressUpdate : onPressCreate} disabled={nameError || breedError || client.running} loading={client.running}>{params ? 'Update' : 'Create'}</Button>
                {params && (
                    <>
                        <Button style={styles.button} mode="outlined" onPress={onPressDelete} disabled={client.running}>Delete</Button>
                        <Dialog visible={confirming} onDismiss={onDismissDelete}>
                            <Dialog.Title>
                                Delete {params.cat.name}?
                            </Dialog.Title>
                            <Dialog.Content>
                                {client.running ? (
                                    <ActivityIndicator />
                                ) : (
                                    <Text>This operation cannot be undone.</Text>
                                )}
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={onDismissDelete} disabled={client.running}>Cancel</Button>
                                <Button onPress={onConfirmDelete} disabled={client.running}>Ok</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </>
                )}
            </SafeAreaView>

            <Snackbar visible={clientError} onDismiss={() => { }} action={{ label: 'Close', onPress: () => setClientError(false) }}>
                {clientMessage}
            </Snackbar>
        </>
    );
}
