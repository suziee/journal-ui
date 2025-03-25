import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { setValues, getValueOrDefault } from '../shared';
import { ErrorContainer } from '../ErrorContainer';

export function EditAreaForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {update, area} = useAppData(NAME.useArea);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "af-name-edit", model: "areaName"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.EDIT_AREA_FORM));
    }, [current]);

    React.useEffect(() => {
        if (area != null) {
            setValues(fieldMap, area);
        }
    }, [area])

    function raiseCancelEvent(event) {
        event.preventDefault();
        setValues(fieldMap, area);
        messenger.broadcast(SUB.CANCEL_UPDATE_AREA);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {
            areaName: getValueOrDefault(event.target.areaName.value),
            areaGuid: area.areaGuid,
        };

        let isSuccessful = await update(request);
        if (isSuccessful) messenger.broadcast(SUB.UPDATED_AREA);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Edit Area</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Name:</label>
                    <input name="areaName" id="af-name-edit"/>
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