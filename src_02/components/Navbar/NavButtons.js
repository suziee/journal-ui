import React from 'react';
import './navbar.css';
import {componentNames as COMP} from '../../state';

export default function NavButtons(props) {
    const {getButton, icons} = props;

    return (
        <div id="nav-bar">
            {getButton(icons[COMP.SEARCH_PAGE])}
            {getButton(icons[COMP.ADD_AREA_FORM])}
            {getButton(icons[COMP.CALENDAR_PAGE])}
            {getButton(icons[COMP.STATS_PAGE])}
            {getButton(icons[COMP.TODO_PAGE])}
        </div>
    )
}