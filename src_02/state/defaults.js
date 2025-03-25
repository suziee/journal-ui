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
import useDeleteHub from './hooks/useDeleteHub';

export default function getDefaults(args) {
    const messenger = useMessenger();

    const _useOpen = useOpen({
        messenger: messenger,
    });

    const deleteHub = useDeleteHub({
        openHub: _useOpen
    });

    const _useError = useError({
        messenger: messenger,
        openHub: _useOpen,
        deleteHub: deleteHub,
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
        [NAME.useOpen]: _useOpen,
        [NAME.useDeleteHub]: deleteHub,
    };

    defaults = {
        ...defaults,
        [NAME.useArea] : useArea({
            messenger: messenger,
            client: _useError,
        }),
        [NAME.useCrag] : useCrag({
            messenger: messenger,
            client: _useError,
        }),
        [NAME.useJournalEntryRoute] : useJournalEntryRoute({
            client: _useError,
            useJournalEntry: _useJournalEntry,
            messenger: messenger,
            useCalendar: _useCalendar,
        }),
        [NAME.useKeyword]: useKeyword(),
        [NAME.useRoute] : useRoute({
            messenger: messenger,
            client: _useError,
        }),
        
    };

    return defaults;
}