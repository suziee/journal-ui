import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValues, getValueOrDefault, getControlledValue } from '../shared';

export function EditCragForm(props) {
    const {update, crag} = useAppData(NAME.useCrag);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "cf-name-edit", model: "cragName"},
        {ui: "cf-dir-edit", model: "picturesDirectory"},
        {ui: "cf-notes-edit", model: "notes"},
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
        show(COMP.CRAG_PAGE); 
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            cragName: getValueOrDefault(event.target.cragName.value),
            picturesDirectory: getValueOrDefault(event.target.picturesDirectory.value),
            notes: getValueOrDefault(event.target.notes.value),
            cragGuid: crag.cragGuid,
        };

        let isSuccessful = await update(request);
        if (isSuccessful) show(COMP.CRAG_PAGE);
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
                <div>
                    <label>Pictures Directory:</label>
                    <input name="picturesDirectory" id="cf-dir-edit"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="cf-notes-edit"></textarea>
                </div>
                <div className="form-buttons">
                    <button className="text-button red" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button green" type="submit">save</button>
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