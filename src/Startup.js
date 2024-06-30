import React from 'react';
import {
    useAppData, 
    hookNames as NAME,
    subscriptionKeys as SUB
} from './state';

export default function Startup(props) {
    const messenger = useAppData(NAME.useMessenger);

    React.useEffect(() => {
        messenger.broadcast(SUB.STARTUP);
    }, []);

    return null;
}