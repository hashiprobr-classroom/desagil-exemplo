// Não é necessário entender ou modificar este arquivo.

import React, { useContext } from 'react';

import createStateContext from '@hashiprobr/react-create-state-context';
import { createEvent } from '@hashiprobr/react-use-emitter-and-listener';

import states from '../global/states.json';
import events from '../global/events.json';

const ctxs = {};
const evts = {};

function provideState(child, name, value) {
    const Context = createStateContext(value);
    ctxs[name] = Context;
    return (
        <Context.Provider>
            {child}
        </Context.Provider>
    );
}

function provideEvent(child, name) {
    const Event = createEvent();
    evts[name] = Event;
    return (
        <Event.Provider>
            {child}
        </Event.Provider>
    );
}

function provide(child) {
    if (typeof states !== 'object') {
        throw new TypeError('File states.json must represent an object');
    }
    for (const [name, value] of Object.entries(states)) {
        if (name.trim() === '') {
            throw new Error('Global state names cannot be blank');
        }
        child = provideState(child, name, value);
    }
    if (!Array.isArray(events)) {
        throw new TypeError('File events.json must represent an array');
    }
    for (const name of events) {
        if (typeof name !== 'string') {
            throw new TypeError('Global event names must be strings');
        }
        if (name.trim() === '') {
            throw new Error('Global event names cannot be blank');
        }
        child = provideEvent(child, name);
    }
    return child;
}

function useGlobalState(name) {
    if (!(name in ctxs)) {
        throw new Error(`Global state ${name} does not exist`);
    }
    return useContext(ctxs[name]);
}

function useGlobalEvent(name) {
    if (!(name in evts)) {
        throw new Error(`Global event ${name} does not exist`);
    }
    return evts[name];
}

export { provide, useGlobalState, useGlobalEvent };
