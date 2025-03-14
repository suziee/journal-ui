import React from 'react';
import './navbar.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import NavButtons from './NavButtons';

export default function NavbarEnabled(props) {
    const {icons} = props;
    const messenger = useAppData(NAME.useMessenger);

    function search() {
        messenger.broadcast(SUB.SHOW_SEARCH);
    }

    function addArea() {
        messenger.broadcast(SUB.ADD_AREA);
    }

    function calendar() {
        messenger.broadcast(SUB.SHOW_CALENDAR);
    }

    function stats() {
        // messenger.broadcast(SUB.SHOW_STATS);
    }

    function todo() {
    }

    icons[COMP.SEARCH_PAGE].func = search;
    icons[COMP.ADD_AREA_FORM].func = addArea;
    icons[COMP.CALENDAR_PAGE].func = calendar;
    icons[COMP.STATS_PAGE].func = stats;
    icons[COMP.TODO_PAGE].func = todo;
    
    function getButton({name, func}) {
        return (
            <div className="nav-button" onClick={func}>
                <span className="material-symbols-outlined size-48">{name}</span>
            </div>
        );
    }

    return <NavButtons getButton={getButton} icons={icons} />
}