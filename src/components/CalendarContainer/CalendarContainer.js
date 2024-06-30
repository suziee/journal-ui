import React from 'react';
import {
    useAppData,
    hookNames as NAME
} from '../../state';
import './calendarContainer.css';
import Calendar from '../Calendar';
import DateRouteList from '../DateRouteList';

export default function CalendarContainer(props) {
    const {updateYear, year} = useAppData(NAME.useCalendar);
    
    const yearRef = React.useRef(year);

    React.useEffect(() => {
        yearRef.current.value = year;
    }, [year]);

    function raiseUpdateEvent() {
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
            </div>
            <DateRouteList />
        </React.Fragment>
    );
}