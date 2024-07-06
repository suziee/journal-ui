import * as NAME from './hooks/hookNames';
import useCalendar from './hooks/useCalendar';
import useKeyword from './hooks/useKeyword';
import useMessenger from './hooks/useMessenger';
import useRoute from './hooks/useRoute';
import useRouteDateForm from './hooks/useRouteDateForm';
import useRouteForm from './hooks/useRouteForm';

export default function getDefaults(args) {
    const messenger = useMessenger();
    
    const _useRoute = useRoute({
        messenger: messenger
    });

    let defaults = {
        [NAME.useMessenger]: messenger,
        [NAME.useRoute]: _useRoute,
    };

    defaults = {
        ...defaults,
        [NAME.useCalendar]: useCalendar({
            messenger: messenger
        }),
        [NAME.useKeyword]: useKeyword({
            messenger: messenger
        }),
        [NAME.useRouteDateForm]: useRouteDateForm({
            messenger: messenger
        }),
        [NAME.useRouteForm]: useRouteForm({
            messenger: messenger,
            useRoute: _useRoute,
        }),
    };

    return defaults;
}