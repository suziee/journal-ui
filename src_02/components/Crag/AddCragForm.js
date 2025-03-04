import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { clearValues, getValueOrDefault, getControlledValue } from '../shared';

export function AddCragForm(props) {
    const {area} = useAppData(NAME.useArea);
    const {add} = useAppData(NAME.useCrag);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
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
        show(COMP.AREA_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            cragName: getValueOrDefault(event.target.cragName.value),
            areaGuid: area.areaGuid,
        };

        let isSuccessful = await add(request);
        if (isSuccessful) show(COMP.CRAG_PAGE);
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