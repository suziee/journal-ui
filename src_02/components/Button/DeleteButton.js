import React from 'react';
import { useAppData, hookNames as NAME } from '../../state';

export function DeleteButton(props) {
    const {dataValue, eventHandler, parentType} = props;
    const [locked, setLocked] = React.useState(true);
    
    const deleteHub = useAppData(NAME.useDeleteHub);

    React.useEffect(() => {
        setLocked(x => deleteHub.getLock(parentType));
    }, [deleteHub.locks]);

    return <React.Fragment>
        {
            locked
            ? <span className="text-button disabled">delete</span>
            : <span className="text-button delete" data-value={dataValue} onClick={eventHandler}>delete</span>
        }
    </React.Fragment>;
}