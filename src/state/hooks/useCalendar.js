import React from 'react';
import { getByYear } from '../../api';
import { JournalEntry } from '../../models';

export default function useCalendar(args) {
    const [year, setYear] = React.useState(new Date(Date.now()).getFullYear());
    const [yearEntries, setYearEntries] = React.useState([]);

    function updateYear(newYear) {
        if (newYear == year) {
            // have this here b/c useEffect won't run when year hasn't changed
            getByYearEntries();
            return;
        }

        setYear(x => newYear);
        
        // not sure if this will run before the year updates,
        // so gonna try useEffect
        // compare with useKeyword and see which works better
        // edit: yeah, you need to do useEffect; when i didn't have it work keyword,
        // i had to click on search button twice for the list to change
        // getByYearEntries();
    }

    React.useEffect(() => {
        getByYearEntries();
    }, [year]);

    function getByYearEntries() {
        async function getDataAsync() {
            let journalEntries = await getByYear(year);
            journalEntries = journalEntries.map(x => new JournalEntry(x));
            setYearEntries(x => journalEntries);
        }

        // move this here from useEffect b/c this method is called in multiple places
        // year probably won't ever be null though due to input validation
        if (year == null) {
            setYearEntries(x => []);
            return;
        }

        getDataAsync();
    }

    return {
        year: year,
        updateYear: updateYear,
        yearEntries: yearEntries,
    };
}