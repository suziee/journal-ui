import React from 'react';
import './calendarResults.css';
import {
    useAppData,
    hookNames as NAME,
    componentNames as COMP
} from '../../state';

export default function CalendarResults(props) {
    const { routes: yearEntries } = useAppData(NAME.useCalendar);
    const { get: getJournalEntry } = useAppData(NAME.useJournalEntry);
    const { show } = useAppData(NAME.useOpen);

    async function raiseRouteEvent(guid) {
        // can't do the data-value attr thing on tr, because the target is td since that's what you're clicking
        await getJournalEntry(guid);
        show(COMP.JOURNAL_ENTRY_PAGE);
    }

    function build() {
        if (yearEntries == null || yearEntries.length == 0) {
            return (
                <div>
                    No results
                </div>
            );
        }

        return <table><tbody>
            {
                yearEntries.map((entry) => {
                    return <tr key={entry.journalEntryRouteGuid} onClick={() => {raiseRouteEvent(entry.journalEntryGuid)}}>
                        <td>{entry.date}</td>
                        <td className="light">{entry.sortId}</td>
                        <td>{entry.routeName}</td>
                        <td className="light">{entry.areaName} / {entry.cragName}</td>
                        <td>{entry.grade}</td>
                        <td>{entry.type}</td>
                    </tr>
                })
            }
        </tbody></table>;
    }

    return (
        <div id="year-results">
            {build()}
        </div>
    );
}