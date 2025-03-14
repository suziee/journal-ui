import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { clearValues, getValueOrDefault, getControlledValue } from '../shared';

export function AddCragForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {area} = useAppData(NAME.useArea);
    const {add} = useAppData(NAME.useCrag);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "cf-name", model: "cragName"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.ADD_CRAG_FORM));
        clearValues(fieldMap);
    }, [current]);

    function raiseCancelEvent(event) {
        event.preventDefault();
        clearValues(fieldMap);
        messenger.broadcast(SUB.CANCEL_ADD_CRAG);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            cragName: getValueOrDefault(event.target.cragName.value),
            areaGuid: area.areaGuid,
        };

        let isSuccessful = await add(request);
        if (isSuccessful) messenger.broadcast(SUB.ADDED_CRAG);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Add Crag</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Area:</label>
                    <input name="area" value={getControlledValue(area?.areaName)} disabled />
                </div>
                <div>
                    <label>Name:</label>
                    <input name="cragName" id="cf-name"/>
                </div>
                <div className="form-buttons">
                    <button className="text-button cancel" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button save" type="submit">save</button>
                </div>
            </form>
            <ul className="form-errors">
                {errors.map((error, index) => {
                    return <li key={`form-error-${index}`}>{error}</li>
                })}
            </ul>
        </div>
    );
}