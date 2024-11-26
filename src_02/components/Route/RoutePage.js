import React from 'react';
import './routePage.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';

export function RoutePage(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {route} = useAppData(NAME.useRoute);
    const {get: getArea} = useAppData(NAME.useArea);
    const {get: getCrag} = useAppData(NAME.useCrag);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.ROUTE_PAGE));
    }, [current]);
	
    async function raiseAreaEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getArea(guid);
        show(COMP.AREA_PAGE);
    }

    async function raiseCragEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getCrag(guid);
        show(COMP.CRAG_PAGE);
    }

    function raiseEditEvent(event) {
        messenger.broadcast(SUB.UPDATE_ROUTE);
        show(COMP.ROUTE_FORM);
    }

	function build() {
		if (route == null) return;

		return <React.Fragment>
            <div className="header">
                <header>
                    Route: <span className="crumb-nav" onClick={raiseAreaEvent} data-value={route.areaGuid}>{route.areaName}</span> / <span className="crumb-nav" onClick={raiseCragEvent} data-value={route.cragGuid}>{route.cragName}</span> / <span className="crumb-leaf">{route.routeName}</span>
                    <br />
                    {route.type}, {route.numberOfPitches} pitches, {route.numberOfFeet} feet, FA: {route.firstAscentionist}
                </header>
                <div className="header-buttons">
                    <span className="material-symbols-outlined size-24 green" onClick={raiseEditEvent}>edit</span>
                    <span className="material-symbols-outlined size-24 red">delete</span>
                </div>
            </div>

            <p>{route.notes}</p>
            <div id="dates-climbed">
                <header>Dates climbed:</header>
                <table>
                    <tbody>
                        {
                            route.entries.map((entry) => {
                                return <tr key={entry.journalEntryRouteGuid}>
                                    <td>{entry.date}</td>
                                    <td>{entry.pitchesClimbed} / {route.numberOfPitches} pitches</td>
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