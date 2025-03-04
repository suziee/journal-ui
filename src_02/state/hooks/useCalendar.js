import React from 'react';
import * as SUB from './subscriptionKeys';
import { useJournalEntry as id } from './hookNames';
import { getByYear } from '../../api';

export default function useCalendar(args) {
    const {messenger} = args;
    const [year, setYear] = React.useState(new Date(Date.now()).getFullYear());
    const [entries, setEntries] = React.useState([]);
    const [routes, setRoutes] = React.useState([]);
    const [date, setDate] = React.useState(null);

    React.useEffect(() => {getResults()}, [year]);

    messenger.subscribe(id, {
        [SUB.STARTUP]: getResults,
        [SUB.REFRESH_YEAR_ROUTES]: getResults,
    });

    function updateYear(newYear) {
        if (newYear == year) {
            return;
        }

        setYear(x => newYear);
    }

    async function getResults() {
        let results = await getByYear(year);
        setEntries(x => results.entries);
        setRoutes(x => results.routes);
    }

    function updateDate(newDate) {
        setDate(x => newDate);
    }

    return {
        year: year,
        updateYear: updateYear,
        entries: entries,
        routes: routes,
        date: date,
        updateDate: updateDate,
        getResults: getResults,
    };
}