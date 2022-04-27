// Não é necessário entender ou modificar este arquivo.

import { useContext } from 'react';

import createStateContext from '@hashiprobr/react-create-state-context';

import settings from '../settings.json';

const DarkContext = createStateContext(settings.dark);

function useDark() {
    return useContext(DarkContext);
}

export { useDark, DarkContext };
