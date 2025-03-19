import React from 'react';
import './cragPage.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { DeleteIcon } from '../Button';

export function CragPage(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {crag, delete: deleteCrag} = useAppData(NAME.useCrag);
    const {get: getRoute} = useAppData(NAME.useRoute);
    const {get: getArea} = useAppData(NAME.useArea);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.CRAG_PAGE));
    }, [current]);

    async function raiseAreaEvent(event) {
        await getArea(crag.areaGuid);
        messenger.broadcast(SUB.SHOW_AREA);
    }

    async function raiseRouteEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getRoute(guid);
        messenger.broadcast(SUB.SHOW_ROUTE);
    }

    function raiseAddEvent(event) {
        messenger.broadcast(SUB.ADD_ROUTE);
    }

    function raiseEditEvent(event) {
        messenger.broadcast(SUB.UPDATE_CRAG);
    }
	
    async function raiseDeleteEvent(event) {
        const isSuccessful = await deleteCrag(crag.cragGuid);
        
        if (isSuccessful) {
            await getArea(crag.areaGuid);
            messenger.broadcast(SUB.DELETED_CRAG);
        }
    }

	function build() {
		if (crag == null) return;
		
		return <React.Fragment>
            <div className="header">
                <header>
                    Crag: <span className="crumb-nav" onClick={raiseAreaEvent}>{crag.areaName}</span> / <span className="crumb-leaf">{crag.cragName}</span>
                </header>
                <div className="header-buttons">
                    <span className="material-symbols-outlined size-24 green" onClick={raiseEditEvent}>edit</span>
                    <DeleteIcon parentType={COMP.CRAG_PAGE} eventHandler={raiseDeleteEvent} />
                </div>
            </div>
            <div>
                <header><span className="text-button add" onClick={raiseAddEvent}>add</span> Routes:</header>
                <ul id="routes">
                    {crag.routes.map((route, index) => {
                        return <li key={route.routeGuid} data-value={route.routeGuid} onClick={raiseRouteEvent}>
                            {route.routeName} ({route.grade}, {route.type}, {route.numberOfPitches} pitches)
                        </li>
                    })}
                </ul>
            </div>
        </React.Fragment>;
	}

    return (
        <div className={open ? "visible" : "hidden"}>
			{build()}
        </div>
    );
}