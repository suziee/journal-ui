import * as NAME from './hooks/hookNames';
import useCalendar from './hooks/useCalendar';
import useError from './hooks/useError';
import useMessenger from './hooks/useMessenger';
import useArea from './hooks/useArea';
import useCrag from './hooks/useCrag'
import useJournalEntry from './hooks/useJournalEntry';
import useJournalEntryRoute from './hooks/useJournalEntryRoute';
import useKeyword from './hooks/useKeyword';
import useRoute from './hooks/useRoute';
import useOpen from './hooks/useOpen';
import useFormBase from './hooks/useFormBase';

export default function getDefaults(args) {
    const messenger = useMessenger();

    const _useError = useError({
        messenger: messenger,
    });
    
    const _useCalendar = useCalendar({
        messenger: messenger,
    });

    const _useJournalEntry = useJournalEntry({
        messenger: messenger,
        client: _useError,
        useCalendar: _useCalendar,
    });

    let defaults = {
        [NAME.useMessenger]: messenger,
        [NAME.useError]: _useError,
        [NAME.useCalendar]: _useCalendar,
        [NAME.useJournalEntry]: _useJournalEntry,
    };

    defaults = {
        ...defaults,
        [NAME.useArea] : useArea({
            messenger: messenger,
            client: _useError,
            useFormBase: useFormBase(),
        }),
        [NAME.useCrag] : useCrag({
            messenger: messenger,
            client: _useError,
            useFormBase: useFormBase(),
        }),
        [NAME.useJournalEntryRoute] : useJournalEntryRoute({
            client: _useError,
            useJournalEntry: _useJournalEntry,
        }),
        [NAME.useKeyword]: useKeyword(),
        [NAME.useRoute] : useRoute({
            messenger: messenger,
            client: _useError,
            useFormBase: useFormBase(),
        }),
        [NAME.useOpen]: useOpen(),
    };

    return defaults;
}