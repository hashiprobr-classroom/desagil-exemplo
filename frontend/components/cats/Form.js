import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ScrollView, Image } from 'react-native';

import { TouchableRipple, ActivityIndicator, TextInput, HelperText, Button, Portal, Dialog, Text, Snackbar } from 'react-native-paper';

import RoundedView from '@hashiprobr/react-native-rounded-view';
import Icon from '@hashiprobr/react-native-paper-icon';
import DropDown from '@hashiprobr/react-native-paper-dropdown';
import { DateTimePicker } from '@hashiprobr/react-native-paper-datetimepicker';

import useRest from '@hashiprobr/react-native-use-rest';
import usePicker from '@hashiprobr/expo-use-picker';

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

    const [loadedPhoto, setLoadedPhoto] = useState(null);
    const [displayPhoto, setDisplayPhoto] = useState(params ? params.cat.photo : null);
    const [name, setName] = useState(params ? params.cat.name : '');
    const [nameError, setNameError] = useState(!validateName(name));
    const [breed, setBreed] = useState(params ? params.cat.breed : '');
    const [breedError, setBreedError] = useState(!validateBreed(breed));
    const [eye, setEye] = useState(params ? params.cat.eye : 'YELLOW');
    const [birth, setBirth] = useState(params ? new Date(params.cat.birth) : new Date());
    const [confirming, setConfirming] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const client = useRest(settings.url);

    const picker = usePicker();

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
            setLoadedPhoto(result);
            setDisplayPhoto(result);
        } catch (error) {
            setMessage(error.message);
            setError(true);
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
        let cat = {
            key: null,
            name: name,
            breed: breed,
            eye: eye,
            birth: birth.getTime(),
        };

        try {
            if (loadedPhoto == null) {
                cat.photo = null;
                cat = await client.post('/cat', cat);
            } else {
                cat.photo = null;
                cat = await client.post('/cat', cat, { photo: loadedPhoto });
            }
            navigation.navigate('List', { action: 'create', cat: cat });
        } catch (error) {
            setMessage(error.message);
            setError(true);
        }
    }

    async function onPressUpdate() {
        let cat = {
            key: params.cat.key,
            name: name,
            breed: breed,
            eye: eye,
            birth: birth.getTime(),
        };

        try {
            if (loadedPhoto == null) {
                cat.photo = displayPhoto;
                cat = await client.put('/cat', cat);
            } else {
                cat.photo = null;
                cat = await client.put('/cat', cat, { photo: loadedPhoto });
            }
            navigation.navigate('List', { action: 'update', cat: cat });
        } catch (error) {
            setMessage(error.message);
            setError(true);
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
            setConfirming(false);
            navigation.navigate('List', { action: 'delete', key: params.cat.key });
        } catch (error) {
            setMessage(error.message);
            setError(true);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container} edges={[]}>
                <ScrollView style={styles.outerScroll} contentContainerStyle={styles.innerScroll}>
                    <TouchableRipple style={styles.photo} onPress={onPressPhoto}>
                        {picker.loading ? (
                            <ActivityIndicator style={styles.image} size="large" />
                        ) : (
                            displayPhoto === null ? (
                                <Icon name="cat" />
                            ) : (
                                <RoundedView style={styles.image}>
                                    <Image style={styles.image} source={{ uri: displayPhoto }} />
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
                            <Portal>
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
                            </Portal>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>

            <Snackbar visible={error} action={{ label: 'Close', onPress: () => setError(false) }} onDismiss={() => { }}>
                {message}
            </Snackbar>
        </>
    );
}
