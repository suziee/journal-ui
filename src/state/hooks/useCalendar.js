import React from 'react';
import { getByYear } from '../../api';
import { JournalEntry } from '../../models';
import * as SUB from './subscriptionKeys';
import { useCalendar as id } from './hookNames';

export default function useCalendar(args) {
    const {messenger} = args;
    const [year, setYear] = React.useState(new Date(Date.now()).getFullYear());
    const [yearEntries, setYearEntries] = React.useState([]);

    messenger.subscribe(id, {
        [SUB.REFRESH_YEAR_ROUTES]: getByYearEntries,
    });

    function updateYear(newYear) {
        if (newYear == year) {
            // don't call getbyyear anymore since it will refresh after a
            // successful save
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

    async function getByYearEntries() {
        // move this here from useEffect b/c this method is called in multiple places
        // year probably won't ever be null though due to input validation
        if (year == null) {
            setYearEntries(x => []);
            return;
        }

        let journalEntries = await getByYear(year);
        journalEntries = journalEntries.map(x => new JournalEntry(x));
        setYearEntries(x => journalEntries);
    }

    return {
        year: year,
        updateYear: updateYear,
        yearEntries: yearEntries,
    };
}