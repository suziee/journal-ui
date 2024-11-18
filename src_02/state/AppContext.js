import React from 'react';
import getDefaults from './defaults';

const AppContext = React.createContext();

export function useAppData(hook) {
    const context = React.useContext(AppContext);
    return context[hook];
}

export function AppContextProvider(props) {
    const {value} = props;

    // do defaultappdata first so that user can override through value

    // console.log("in provider");

    return (
        <AppContext.Provider value={{...getDefaults(), ...value}}>
            {props.children}
        </AppContext.Provider>
    );
}