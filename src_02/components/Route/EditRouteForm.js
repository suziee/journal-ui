import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValues, getValueOrDefault, getControlledValue } from '../shared';

export function EditRouteForm(props) {
    const {update, isAdd, route} = useAppData(NAME.useRoute);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "erf-name", model: "routeName"},
        {ui: "erf-type", model: "type"},
        {ui: "erf-grade", model: "grade"},
        {ui: "erf-pitches", model: "numberOfPitches"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.EDIT_ROUTE_FORM));
    }, [current]);

    React.useEffect(() => {
        if (route != null) {
            setValues(fieldMap, route);
        }
    }, [isAdd, route])

    function raiseCancelEvent(event) {
        event.preventDefault();
        setValues(fieldMap, route);
        show(COMP.ROUTE_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            routeName: getValueOrDefault(event.target.routeName.value),
            type: getValueOrDefault(event.target.routeType.value),
            grade: getValueOrDefault(event.target.grade.value),
            numberOfPitches: getValueOrDefault(event.target.numberOfPitches.value),
            routeGuid: route.routeGuid,
            areaName: route.areaName,
            cragGuid: route.cragGuid,
            cragName: route.cragName,
        };

        let isSuccessful = await update(request);
        if (isSuccessful) show(COMP.ROUTE_PAGE);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Edit Route</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Area:</label>
                    <input name="areaName" value={getControlledValue(route?.areaName)} disabled />
                </div>
                <div>
                    <label>Crag:</label>
                    <input name="cragName" value={getControlledValue(route?.cragName)} disabled />
                </div>
                <div>
                    <label>Name:</label>
                    <input name="routeName" id="erf-name"/>
                </div>
                <div>
                    <label>Type:</label>
                    <input name="routeType" id="erf-type"/>
                </div>
                <div>
                    <label>Grade:</label>
                    <input name="grade" id="erf-grade"/>
                </div>
                <div>
                    <label>Number of Pitches:</label>
                    <input name="numberOfPitches" id="erf-pitches"/>
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