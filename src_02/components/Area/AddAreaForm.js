import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { clearValues, getValueOrDefault } from '../shared';
import { ErrorContainer } from '../ErrorContainer';

export function AddAreaForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {add} = useAppData(NAME.useArea);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "af-name", model: "areaName"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.ADD_AREA_FORM));
        clearValues(fieldMap);
    }, [current]);

    function raiseCancelEvent(event) {
        event.preventDefault();
        clearValues(fieldMap);
        messenger.broadcast(SUB.CANCEL_ADD_AREA);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {
            areaName: getValueOrDefault(event.target.areaName.value),
        };

        let isSuccessful = await add(request);
        if (isSuccessful) messenger.broadcast(SUB.ADDED_AREA);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Add Area</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Name:</label>
                    <input name="areaName" id="af-name"/>
                </div>
                <div className="form-buttons">
                    <button className="text-button cancel" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button save" type="submit">save</button>
                </div>
            </form>
            <ErrorContainer />
        </div>
    );
}