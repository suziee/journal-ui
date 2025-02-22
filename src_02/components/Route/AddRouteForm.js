import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { clearValues, getValueOrDefault, getControlledValue } from '../shared';

export function AddRouteForm(props) {
    const {crag} = useAppData(NAME.useCrag);
    const {add} = useAppData(NAME.useRoute);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "rf-name", model: "routeName"},
        {ui: "rf-type", model: "type"},
        {ui: "rf-grade", model: "grade"},
        {ui: "rf-pitches", model: "numberOfPitches"},
    ];

    React.useEffect(() => {
        let active = getOpen(COMP.ADD_ROUTE_FORM);
        setOpen(x => active);
        if (active) {
            clearValues(fieldMap);
        }
    }, [current]);

    function raiseCancelEvent(event) {
        event.preventDefault();
        clearValues(fieldMap);
        show(COMP.CRAG_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            routeName: getValueOrDefault(event.target.routeName.value),
            type: getValueOrDefault(event.target.routeType.value),
            grade: getValueOrDefault(event.target.grade.value),
            numbeOfPitches: getValueOrDefault(event.target.numberOfPitches.value),
        };

        let isSuccessful = await add(request);
        if (isSuccessful) show(COMP.ROUTE_PAGE);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Add Route</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Area:</label>
                    <input name="areaName" value={getControlledValue(crag?.areaName)} disabled />
                </div>
                <div>
                    <label>Crag:</label>
                    <input name="cragName" value={getControlledValue(crag?.cragName)} disabled />
                </div>
                <div>
                    <label>Name:</label>
                    <input name="routeName" id="rf-name"/>
                </div>
                <div>
                    <label>Type:</label>
                    <input name="routeType" id="rf-type"/>
                </div>
                <div>
                    <label>Grade:</label>
                    <input name="grade" id="rf-grade"/>
                </div>
                <div>
                    <label>Number of Pitches:</label>
                    <input name="numberOfPitches" id="rf-pitches"/>
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