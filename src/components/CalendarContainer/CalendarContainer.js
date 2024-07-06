import React from 'react';
import {
    useAppData,
    hookNames as NAME
} from '../../state';
import './calendarContainer.css';
import Calendar from '../Calendar';
import DateRouteList from '../DateRouteList';
import {validate} from './validator.js';

export default function CalendarContainer(props) {
    const {updateYear, year} = useAppData(NAME.useCalendar);
    const [error, setError] = React.useState(null);
    const yearRef = React.useRef(year);

    React.useEffect(() => {
        yearRef.current.value = year;
    }, [year]);

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

    return (
        <React.Fragment>
            <Calendar />
            <div id="current-year-form">
                Days climbed for the year
                <input type="text" ref={yearRef}/>
                <button onClick={raiseUpdateEvent}>Update</button>
                <div id="calendar-error">{error}</div>
            </div>
            <DateRouteList />
        </React.Fragment>
    );
}