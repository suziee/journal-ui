import React from 'react';
import {
    useAppData,
    hookNames as NAME,
    componentNames as COMP
} from '../../state';
import './calendarContainer.css';
import Calendar from './Calendar';
import CalendarResults from './CalendarResults';
import {validate} from './validator.js';

export default function CalendarPage(props) {
    const {updateYear, year} = useAppData(NAME.useCalendar);
    const [error, setError] = React.useState(null);
    const yearRef = React.useRef(year);

    React.useEffect(() => {
        yearRef.current.value = year;
    }, [year]);

    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.CALENDAR_PAGE));
    }, [current]);

    function raiseUpdateEvent() {
        let validateResult = validate(yearRef.current.value);
        if (!validateResult.isValid) {
            setError(x => validateResult.error);
            return;
        }

        setError(x => null);
        const year = parseInt(yearRef.current.value);
        updateYear(year);
    }

    document.getElementById("year-bar")?.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            raiseUpdateEvent();
        }
    })

    return (
        <div className={open ? "visible" : "hidden"}>
            <Calendar />
            <div id="current-year-form">
                What you climbed in
                <input type="text" placeholder="year" ref={yearRef} id="year-bar"/>
                <button onClick={raiseUpdateEvent}>Update</button>
                <div id="calendar-error">{error}</div>
            </div>
            <CalendarResults />
        </div>
    );
}