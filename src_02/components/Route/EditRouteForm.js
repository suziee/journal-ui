import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { setValues, getValueOrDefault, getControlledValue } from '../shared';
import { ErrorContainer } from '../ErrorContainer';
import RouteTypeSelector from './RouteTypeSelector';

export function EditRouteForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {update, isAdd, route} = useAppData(NAME.useRoute);
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
        messenger.broadcast(SUB.CANCEL_UPDATE_ROUTE);
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
        if (isSuccessful) messenger.broadcast(SUB.UPDATED_ROUTE);
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
                    <RouteTypeSelector name="routeType" id="erf-type"/>
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
                    <button className="text-button cancel" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button save" type="submit">save</button>
                </div>
            </form>
            <ErrorContainer />
        </div>
    );
}