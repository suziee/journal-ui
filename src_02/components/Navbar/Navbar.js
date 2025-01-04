import React from 'react';
import './navbar.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';

export default function Navbar(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {show, current} = useAppData(NAME.useOpen);
    const [enabled, setEnabled] = React.useState(true);

    React.useEffect(() => {
        setEnabled(x => !(current == COMP.ADD_AREA_FORM
            || current == COMP.ADD_CRAG_FORM
            || current == COMP.ADD_JOURNAL_ENTRY_FORM
            || current == COMP.ADD_JOURNAL_ENTRY_ROUTE_FORM
            || current == COMP.ADD_ROUTE_FORM
            || current == COMP.EDIT_AREA_FORM
            || current == COMP.EDIT_CRAG_FORM
            || current == COMP.EDIT_JOURNAL_ENTRY_FORM
            || current == COMP.EDIT_JOURNAL_ENTRY_ROUTE_FORM
            || current == COMP.EDIT_ROUTE_FORM));
    }, [current]);

    function search() {
        if (enabled) show(COMP.SEARCH_PAGE);
    }

    function addArea() {
        if (enabled) {
            messenger.broadcast(SUB.ADD_AREA);
            show(COMP.ADD_AREA_FORM);
        }
    }

    function calendar() {
        if (enabled) show(COMP.CALENDAR_PAGE);
    }

    function stats() {
        // messenger.broadcast(SUB.SHOW_STATS);
    }

    function todo() {
    }

    /** not doing component b/c of the enabled flag... */
    function getButton(name, func) {
        return (
            <div className={enabled ? "nav-button" : "nav-button-disabled"} onClick={func}>
                <span className="material-symbols-outlined size-48">{name}</span>
            </div>
        );
    }

    return (
        <div id="nav-bar">
            {getButton("house", search)}
            {getButton("add_photo_alternate", addArea)}
            {getButton("calendar_month", calendar)}
            {getButton("bar_chart_4_bars", stats)}
            {getButton("checklist", todo)}
        </div>
    );
}