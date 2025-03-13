import React from 'react';
import { useAppData, hookNames as NAME } from '../../state';

export function DeleteIcon(props) {
    const {eventHandler, parentType} = props;
    const [locked, setLocked] = React.useState(true);

    const deleteHub = useAppData(NAME.useDeleteHub);
    
    React.useEffect(() => {
        setLocked(x => deleteHub.getLock(parentType));
    }, [deleteHub.locks]);

    function toggleLock(event) {
        deleteHub.toggleLock(parentType);
    }

    return <React.Fragment>
        {
            locked
            ? <span className="material-symbols-outlined size-24 green" onClick={toggleLock}>lock</span>
            : <span className="material-symbols-outlined size-24 green" onClick={toggleLock}>lock_open</span>
        }
        {
            locked
            ? <span className="material-symbols-outlined size-24 disabled">delete</span>
            : <span className="material-symbols-outlined size-24 red" onClick={eventHandler}>delete</span>
        }
    </React.Fragment>;
}