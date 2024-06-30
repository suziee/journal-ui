import React from 'react';
import { getByYear } from '../../api';
import { JournalEntry } from '../../models';

export default function useCalendar(args) {
    const [year, setYear] = React.useState(new Date(Date.now()).getFullYear());
    const [yearEntries, setYearEntries] = React.useState([]);

    function updateYear(newYear) {
        if (newYear == year) getByYearEntries();
        setYear(x => newYear);
        
        // not sure if this will run before the year updates,
        // so gonna try useEffect
        // compare with useKeyword and see which works better
        // edit: yeah, you need to do useEffect; when i didn't have it work keyword,
        // i had to click on search button twice for the list to change
        // getByYearEntries();
    }

    React.useEffect(() => {
        if (year == null) {
            return;
        }

        getByYearEntries();
    }, [year]);

    function getByYearEntries() {
        async function getDataAsync() {
            let journalEntries = await getByYear(year);

            journalEntries = journalEntries.map(x => new JournalEntry(x));

            setYearEntries(x => journalEntries);
        }

        getDataAsync();
    }

    return {
        year: year,
        updateYear: updateYear,
        yearEntries: yearEntries,
    };
}