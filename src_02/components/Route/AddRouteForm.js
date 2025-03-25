import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { clearValues, getValueOrDefault, getControlledValue } from '../shared';
import { ErrorContainer } from '../ErrorContainer';

export function AddRouteForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {crag} = useAppData(NAME.useCrag);
    const {add} = useAppData(NAME.useRoute);
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
        messenger.broadcast(SUB.CANCEL_ADD_ROUTE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            routeName: getValueOrDefault(event.target.routeName.value),
            type: getValueOrDefault(event.target.routeType.value),
            grade: getValueOrDefault(event.target.grade.value),
            numberOfPitches: getValueOrDefault(event.target.numberOfPitches.value),
            areaName: crag.areaName,
            cragGuid: crag.cragGuid,
            cragName: crag.cragName,
        };

        let isSuccessful = await add(request);
        if (isSuccessful) messenger.broadcast(SUB.ADDED_ROUTE);
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
                    <button className="text-button cancel" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button save" type="submit">save</button>
                </div>
            </form>
            <ErrorContainer />
        </div>
    );
}