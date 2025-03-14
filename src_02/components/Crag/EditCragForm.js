import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { setValues, getValueOrDefault, getControlledValue } from '../shared';

export function EditCragForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {update, crag} = useAppData(NAME.useCrag);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "cf-name-edit", model: "cragName"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.EDIT_CRAG_FORM));
    }, [current]);

    React.useEffect(() => {
        if (crag != null) {
            setValues(fieldMap, crag);
        }
    }, [crag]); // need crag for update if it's first; isAdd won't trigger b/c it'll still be false

    function raiseCancelEvent(event) {
        event.preventDefault();
        setValues(fieldMap, crag);
        messenger.broadcast(SUB.CANCEL_UPDATE_CRAG);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            cragName: getValueOrDefault(event.target.cragName.value),
            cragGuid: crag.cragGuid,
            areaGuid: crag.areaGuid,
        };

        let isSuccessful = await update(request);
        if (isSuccessful) messenger.broadcast(SUB.UPDATED_CRAG);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Edit Crag</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Area:</label>
                    <input name="area" value={getControlledValue(crag?.areaName)} disabled />
                </div>
                <div>
                    <label>Name:</label>
                    <input name="cragName" id="cf-name-edit"/>
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