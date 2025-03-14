import React from 'react';
import './calendar.css';
import { CalendarBuilder } from './calendar-builder.js';
import {
    useAppData
    , hookNames as NAME
	, subscriptionKeys as SUB
} from '../../state';

export default function Calendar(props) {
	const messenger = useAppData(NAME.useMessenger);
    const { entries: yearEntries, year, updateDate } = useAppData(NAME.useCalendar);
	const {get: getJournalEntry} = useAppData(NAME.useJournalEntry);

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

	async function raiseClickEvent(event) {
		const dateStr = event.target.attributes.name.value;
		let entry = yearEntries.find(x => x.date == dateStr);
		if (entry) {
			await getJournalEntry(entry.journalEntryGuid);
			messenger.broadcast(SUB.SHOW_JOURNAL_ENTRY);
		} else {
			updateDate(dateStr);
			messenger.broadcast(SUB.ADD_JOURNAL_ENTRY);
		}
	}

    return (
		<div className="graph-box">
			<table id="calendar-graph" className="bar-graph"></table>
		</div>
		
    );
}