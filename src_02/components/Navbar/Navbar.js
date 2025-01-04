import React from 'react';
import './navbar.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import NavbarEnabled from './NavbarEnabled';
import NavbarDisabled from './NavbarDisabled';

export default function Navbar(props) {
    const {current} = useAppData(NAME.useOpen);
    const [enabled, setEnabled] = React.useState(true);

    const icons = {
        [COMP.SEARCH_PAGE]: {name: "house"},
        [COMP.ADD_AREA_FORM]: {name: "add_photo_alternate"},
        [COMP.CALENDAR_PAGE]: {name: "calendar_month"},
        [COMP.STATS_PAGE]: {name: "bar_chart_4_bars"},
        [COMP.TODO_PAGE]: {name: "checklist"},
    };

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

    return enabled ? <NavbarEnabled icons={icons} /> : <NavbarDisabled icons={icons} />
}