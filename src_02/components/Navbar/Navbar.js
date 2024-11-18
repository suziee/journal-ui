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
        setEnabled(x => !(current == COMP.AREA_FORM
            || current == COMP.CRAG_FORM
            || current == COMP.JOURNAL_ENTRY_FORM
            || current == COMP.JOURNAL_ENTRY_ROUTE_FORM
            || current == COMP.ROUTE_FORM));
    }, [current]);

    function search() {
        if (enabled) show(COMP.SEARCH_PAGE);
    }

    function addArea() {
        if (enabled) {
            messenger.broadcast(SUB.ADD_AREA);
            show(COMP.AREA_FORM);
        }
    }

    function calendar() {
        if (enabled) show(COMP.CALENDAR_PAGE);
    }

    function stats() {
        // messenger.broadcast(SUB.SHOW_STATS);
    }

    return (
        <div id="nav-bar">
            <div className={enabled ? "nav-button" : "nav-button-disabled"} onClick={search}>
                <span className="material-symbols-outlined size-48">house</span>
            </div>
            <div className={enabled ? "nav-button" : "nav-button-disabled"} onClick={addArea}>
                <span className="material-symbols-outlined size-48">add_photo_alternate</span>
            </div>
            <div className={enabled ? "nav-button" : "nav-button-disabled"} onClick={calendar}>
                <span className="material-symbols-outlined size-48">calendar_month</span>
            </div>
            <div className={enabled ? "nav-button" : "nav-button-disabled"} onClick={stats}>
                <span className="material-symbols-outlined size-48">bar_chart_4_bars</span>
            </div>
        </div>
    );
}