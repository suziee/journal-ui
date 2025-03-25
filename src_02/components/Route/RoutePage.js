import React from 'react';
import './routePage.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { DeleteIcon } from '../Button';
import { ErrorContainer } from '../ErrorContainer';

export function RoutePage(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {route, delete: deleteRoute} = useAppData(NAME.useRoute);
    const {get: getArea} = useAppData(NAME.useArea);
    const {get: getCrag} = useAppData(NAME.useCrag);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const {get: getJournalEntry} = useAppData(NAME.useJournalEntry);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.ROUTE_PAGE));
    }, [current]);
	
    async function raiseAreaEvent(event) {
        await getArea(route.areaGuid);
        messenger.broadcast(SUB.SHOW_AREA);
    }

    async function raiseCragEvent(event) {
        await getCrag(route.cragGuid);
        messenger.broadcast(SUB.SHOW_CRAG);
    }

    function raiseEditEvent(event) {
        messenger.broadcast(SUB.UPDATE_ROUTE);
    }

    async function raiseDateEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getJournalEntry(guid);
        messenger.broadcast(SUB.SHOW_JOURNAL_ENTRY);
    }

    async function raiseDeleteEvent(event) {
        const isSuccessful = await deleteRoute(route.routeGuid);
        
        if (isSuccessful) {
            // maybe get rid of data value in raiseareaEvent and raiseCragEvent??
            await getCrag(route.cragGuid);
            messenger.broadcast(SUB.DELETED_ROUTE);
        }
    }

	function build() {
		if (route == null) return;

		return <React.Fragment>
            <div className="header">
                <header>
                    Route: <span className="crumb-nav" onClick={raiseAreaEvent}>{route.areaName}</span> / <span className="crumb-nav" onClick={raiseCragEvent}>{route.cragName}</span> / <span className="crumb-leaf">{route.routeName}</span>
                    <br />
                    {route.grade} {route.type}, {route.numberOfPitches} pitches
                </header>
                <div className="header-buttons">
                    <span className="material-symbols-outlined size-24 green" onClick={raiseEditEvent}>edit</span>
                    <DeleteIcon parentType={COMP.ROUTE_PAGE} eventHandler={raiseDeleteEvent} />
                </div>
            </div>
            <ErrorContainer />
            <p>{route.notes}</p>
            <div id="dates-climbed">
                <header>Dates climbed:</header>
                <table>
                    <colgroup>
                        <col span="1" width="100px" />
                        <col span="1" width="100px" />
                        
                    </colgroup>
                    <tbody>
                        {
                            route.entries?.map((entry) => {
                                return <tr key={entry.journalEntryRouteGuid}>
                                    <td className="crumb-nav" onClick={raiseDateEvent} data-value={entry.journalEntryGuid}>{entry.date}</td>
                                    <td style={{width: 75}}>{entry.climbType}</td>
                                    <td style={{width: 125}}>{entry.pitchesClimbed} / {route.numberOfPitches} pitches</td>
                                    <td>{entry.notes}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </React.Fragment>;
	}

    return (
        <div className={open ? "visible" : "hidden"}>
			{build()}
        </div>
    );
}