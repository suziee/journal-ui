import React from 'react';
import './calendar.css';
import { CalendarBuilder } from './calendar-builder.js';
import {
    useAppData
    , hookNames as NAME
	, componentNames as COMP
} from '../../state';

export default function Calendar(props) {
    const { entries: yearEntries, year } = useAppData(NAME.useCalendar);
	const {show} = useAppData(NAME.useOpen);

	React.useEffect(() => {
		if (yearEntries == null) {
			return;
		}

		const dates = yearEntries.map((entry) => {
			//https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
			// js string to date weird behavior... yyyy-mm-dd = one day behind, yyyy/mm/dd = correct date
			return new Date(entry.date.replace("-","/"));
		});

		const builder = new CalendarBuilder({dates: dates, year: year});
		builder.build("calendar-graph", raiseClickEvent);
	}, [yearEntries]);

	function raiseClickEvent(event) {
		const dateStr = event.target.attributes.name.value;
		let entry = yearEntries.find(x => x.date == dateStr);
		if (entry) {
			show(COMP.JOURNAL_ENTRY_PAGE);
		} else {
			show(COMP.JOURNAL_ENTRY_FORM);
		}
	}

    return (
		<div className="graph-box">
			<table id="calendar-graph" className="bar-graph"></table>
		</div>
		
    );
}