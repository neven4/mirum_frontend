import React from 'react';
import {State} from "./AppProvider"

export interface IContext {
    state: State,
    update: (arg : object) => void
}

const Context = React.createContext<IContext>({
    state: {
        cafes: {
            read: () => {}
        },
        likedCafes: [],
        shareModalOpen: false,
        shareModalPage: null,
        shareModalId: null,
        device: null
    },
    update: () => {}
});

export default Context;