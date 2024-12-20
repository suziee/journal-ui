import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValues, clearValues } from '../shared';

export function CragForm(props) {
    const {area} = useAppData(NAME.useArea);
    const {add, update, isAdd, crag} = useAppData(NAME.useCrag);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "cf-area", model: "areaName"},
        {ui: "cf-name", model: "cragName"},
        {ui: "cf-dir", model: "picturesDirectory"},
        {ui: "cf-notes", model: "notes"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.CRAG_FORM));
    }, [current]);

    React.useEffect(() => {
        if (isAdd) {
            clearValues(fieldMap);
        } else if (crag != null) {
            setValues(fieldMap, crag);
        }
    }, [isAdd, crag]); // need crag for update if it's first; isAdd won't trigger b/c it'll still be false

    function raiseCancelEvent(event) {
        event.preventDefault();
        if (isAdd) {
            clearValues(fieldMap);
            show(COMP.AREA_PAGE);
        } else {
            show(COMP.CRAG_PAGE); 
        }
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            cragName: event.target.cragName.value,
            picturesDirectory: event.target.picturesDirectory.value,
            notes: event.target.notes.value,
        };

        if (!isAdd) {
            request = {...request, cragGuid: crag.cragGuid};
        }

        let isSuccessful = isAdd ? await add(request) : await update(request);
        if (isSuccessful) show(COMP.CRAG_PAGE);
    }

    function getAreaInput() {
        if (area || crag)
            return <input name="area" id="cf-area" value={area ? area.areaName : crag.areaName} disabled />
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Add crag</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Area:</label>
                    {getAreaInput()}
                </div>
                <div>
                    <label>Name:</label>
                    <input name="cragName" id="cf-name"/>
                </div>
                <div>
                    <label>Pictures Directory:</label>
                    <input name="picturesDirectory" id="cf-dir"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="cf-notes"></textarea>
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