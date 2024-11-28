import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValues, clearValues } from '../shared';

export function RouteForm(props) {
    const {crag} = useAppData(NAME.useCrag);
    const {add, update, isAdd, route} = useAppData(NAME.useRoute);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "rf-area", model: "areaName"},
        {ui: "rf-crag", model: "cragName"},
        {ui: "rf-name", model: "routeName"},
        {ui: "rf-dir", model: "picturesDirectory"},
        {ui: "rf-type", model: "type"},
        {ui: "rf-grade", model: "grade"},
        {ui: "rf-pitches", model: "numberOfPitches"},
        {ui: "rf-feet", model: "numberOfFeet"},
        {ui: "rf-fa", model: "firstAscentionist"},
        {ui: "rf-notes", model: "notes"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.ROUTE_FORM));
    }, [current]);

    React.useEffect(() => {
        if (isAdd) {
            clearValues(fieldMap);
        } else if (route != null) {
            setValues(fieldMap, route);
        }
    }, [isAdd, route])

    function raiseCancelEvent(event) {
        event.preventDefault();
        if (isAdd) clearValues(fieldMap);
        show(COMP.CRAG_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            routeName: event.target.routeName.value,
            picturesDirectory: event.target.picturesDirectory.value,
            type: event.target.routeType.value,
            grade: event.target.grade.value,
            numbeOfPitches: event.target.numberOfPitches.value,
            numberOfFeet: event.target.numberOfFeet.value,
            firstAscentionist: event.target.firstAscentionist.value,
            notes: event.target.notes.value,
        };

        if (!isAdd) {
            request = {...request, routeGuid: route.routeGuid, cragGuid: route.cragGuid};
        }

        let isSuccessful = isAdd ? await add(request) : await update(request);
        if (isSuccessful) show(COMP.ROUTE_PAGE);
    }

    function getAreaInput() {
        if (crag || route) 
            return <input name="areaName" id="rf-area" value={crag ? crag.areaName : route.areaName} disabled />
    }

    function getCragInput() {
        if (crag || route) 
            return <input name="cragName" id="rf-crag" value={crag ? crag.cragName : route.cragName} disabled />
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Add area</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Area:</label>
                    {getAreaInput()}
                </div>
                <div>
                    <label>Crag:</label>
                    {getCragInput()}
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
                <div>
                    <label>Number of Feet:</label>
                    <input name="numberOfFeet" id="rf-feet"/>
                </div>
                <div>
                    <label>First Ascentionist:</label>
                    <input name="firstAscentionist" id="rf-fa"/>
                </div>
                <div>
                    <label>Pictures Directory:</label>
                    <input name="picturesDirectory" id="rf-dir"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="rf-notes"></textarea>
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