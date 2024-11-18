import React from 'react';
import './calendar.css';
import { getCalendarGrid } from './calendar-grid.js';
import {
    useAppData,
    hookNames as NAME
} from '../../state';

export default function Calendar(props) {
    const { entries: yearEntries, year } = useAppData(NAME.useCalendar);

	React.useEffect(() => {
		if (yearEntries == null) {
			return;
		}

		let dates = yearEntries.map((entry) => {
			return entry.date;
		});
		
		//https://stackoverflow.com/questions/20069828/how-to-convert-set-to-array
		dates = Array.from(new Set(dates));
		dates = dates.map((date) => {
			//https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
			// js string to date weird behavior... yyyy-mm-dd = one day behind, yyyy/mm/dd = correct date
			return new Date(date.replace("-","/"));
		})

		// have to reverse b/c it comes back in DESC order from api
		getCalendarGrid(dates/*.reverse()*/, year);
	}, [yearEntries]);

    return (
		<div className="graph-box">
			<table id="calendar-graph" className="bar-graph"></table>
		</div>
		
    );
}