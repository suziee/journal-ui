import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { clearValues, getValueOrDefault, getControlledValue } from '../shared';
import { ErrorContainer } from '../ErrorContainer';

export function AddJournalEntryRouteForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {areas} = useAppData(NAME.useArea);
    const {crags} = useAppData(NAME.useCrag);
    const {routes} = useAppData(NAME.useRoute);
    const {journalEntry} = useAppData(NAME.useJournalEntry);
    const {add} = useAppData(NAME.useJournalEntryRoute);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    //https://stackoverflow.com/questions/64495308/cascade-dropdown-using-react-hooks
    const [{area, crag, route}, setRequestData] = React.useState({area: null, crag: null, route: null});

    const fieldMap = [
        {ui: "jerf-area", model: "areaGuid"},
        {ui: "jerf-crag", model: "cragGuid"},
        {ui: "jerf-route", model: "routeGuid"},
        {ui: "jerf-notes", model: "notes"},
        {ui: "jerf-pitches", model: "pitchesClimbed"},
        {ui: "ejerf-type", model: "climbType"},
    ];

    React.useEffect(() => {
        let active = getOpen(COMP.ADD_JOURNAL_ENTRY_ROUTE_FORM);
        setOpen(x => active);

        if (active) {
            clearValues(fieldMap);
            // to do: this is hacky, so change later...but refactoring the shared code into a helper method would mean that
            // i would have ot od the same for crag and route events... ugh...
            // it solves the bug where the area drop down has a value, but crag and route drop downs are empty
            raiseAreaChangeEvent({target: {value: areas[0].areaGuid}});
        } 
    }, [current]);

    function raiseCancelEvent(event) {
        event.preventDefault();
        clearValues(fieldMap);
        messenger.broadcast(SUB.CANCEL_ADD_JOURNAL_ENTRY_ROUTE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {
            areaGuid: area,
            cragGuid: crag,
            routeGuid: route,
            journalEntryGuid: journalEntry.journalEntryGuid,
            notes: getValueOrDefault(event.target.notes.value),
            pitchesClimbed: getValueOrDefault(event.target.pitchesClimbed.value),
            climbType: getValueOrDefault(event.target.climbType.value),
        };

        let isSuccessful = await add(request);
        if (isSuccessful) messenger.broadcast(SUB.ADDED_JOURNAL_ENTRY_ROUTE);
    }

    function getAreaInput() {
        return <select id="jerf-area" name="areaGuid" onChange={raiseAreaChangeEvent} value={area ?? ""}>
            {areas.map((area) => {
                return <option value={area.areaGuid} key={area.areaGuid}>{area.areaName}</option>
            })}
        </select>
    }

    function raiseAreaChangeEvent(event) {
        const _area = event.target.value;
        const _crags = crags.filter(x => x.areaGuid == _area);
        const _crag = _crags ? _crags[0].cragGuid : null;
        const _routes = routes.filter(x => x.cragGuid == _crag);
        const _route = _routes ? _routes[0].routeGuid : null;

        setRequestData(x => ({...x, area: _area, crag: _crag, route: _route}));
    }

    function getCragInput() {
        let temp = crags;
        if (!area) temp = [];
        if (area) temp = temp.filter(x => x.areaGuid == area);
        if (!temp) temp = [];

        return <select id="jerf-crag" name="cragGuid" onChange={raiseCragChangeEvent} value={crag ?? ""}>
            {temp.map((crag) => {
                return <option value={crag.cragGuid} key={crag.cragGuid}>{crag.cragName}</option>
            })}
        </select>
    }

    function raiseCragChangeEvent(event) {
        const _crag = event.target.value;
        const _routes = routes.filter(x => x.cragGuid == _crag);
        const _route = _routes ? _routes[0].routeGuid : null;

        setRequestData(x => ({...x, crag: _crag, route: _route}));
    }

    function getRouteInput() {
        let temp = routes;
        if (!area || !crag) temp = [];
        if (area) temp = temp.filter(x => x.areaGuid == area);
        if (temp && crag) temp = temp.filter(x => x.cragGuid == crag);
        if (!temp) temp = [];

        return <select id="jerf-route" name="routeGuid" onChange={raiseRouteChangeEvent} value={route ?? ""}>
            {temp.map((route) => {
                return <option value={route.routeGuid} key={route.routeGuid}>{route.routeName}</option>
            })}
        </select>
    }

    function raiseRouteChangeEvent(event) {
        setRequestData(x => ({...x, route: event.target.value}));
    }

    // function getDateInput() {
    //     if (journalEntry == null) return null;

    //     return <input name="date" id="jerf-date" value={journalEntry.date} disabled/>
    // }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Add Route Climbed</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Date:</label>
                    {/* {getDateInput()} */}
                    <input name="date" value={getControlledValue(journalEntry?.date)} disabled/> 
                </div>
                <div>
                    <label>Area:</label>
                    {getAreaInput()}
                </div>
                <div>
                    <label>Crag:</label>
                    {getCragInput()}
                </div>
                <div>
                    <label>Route:</label>
                    {getRouteInput()}
                </div>
                <div>
                    <label>Pitches Climbed:</label>
                    <input name="pitchesClimbed" id="jerf-pitches"/>
                </div>
                <div>
                    <label>Climb Type:</label>
                    <input name="climbType" id="ejerf-type"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="jerf-notes"></textarea>
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