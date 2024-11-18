import React from 'react';
import './global.css';
import { AppContextProvider } from './state';
import Startup from './Startup';
import AppContainer from './components/AppContainer/AppContainer';
// import { loadExtensionMethods } from './helpers';

export default function App(props) {
	//loadExtensionMethods();

    // index runs four times (or two?) in strict mode, twice not in strict mode
    // for each index, app renders twice
    // for each app render, provider and default render once
    // console.log("in app");
    // all the hooks render four times in strict mode

    return (
        <AppContextProvider>
            <Startup />
            <AppContainer />
        </AppContextProvider>
    );
}