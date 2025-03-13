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
    const deleteHub = useAppData(NAME.useDeleteHub);
    const {crag, delete: deleteCrag} = useAppData(NAME.useCrag);
    const {get: getRoute} = useAppData(NAME.useRoute);
    const {get: getArea} = useAppData(NAME.useArea);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.CRAG_PAGE));
    }, [current]);

    async function raiseAreaEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getArea(guid);
        show(COMP.AREA_PAGE);
        deleteHub.resetLock(COMP.CRAG_PAGE);
    }

    async function raiseRouteEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getRoute(guid);
        show(COMP.ROUTE_PAGE);
        deleteHub.resetLock(COMP.CRAG_PAGE);
    }

    function raiseAddEvent(event) {
        messenger.broadcast(SUB.ADD_ROUTE);
        show(COMP.ADD_ROUTE_FORM);
        deleteHub.resetLock(COMP.CRAG_PAGE);
    }

    function raiseEditEvent(event) {
        messenger.broadcast(SUB.UPDATE_CRAG);
        show(COMP.EDIT_CRAG_FORM);
        deleteHub.resetLock(COMP.CRAG_PAGE);
    }
	
    async function raiseDeleteEvent(event) {
        const isSuccessful = await deleteCrag(crag.cragGuid);
        
        if (isSuccessful) {
            // maybe get rid of data value in raiseareaEvent and raiseCragEvent??
            await getArea(crag.areaGuid);
            show(COMP.AREA_PAGE);
            deleteHub.resetLock(COMP.CRAG_PAGE);
        }
    }

	function build() {
		if (crag == null) return;
		
		return <React.Fragment>
            <div className="header">
                <header>
                    Crag: <span className="crumb-nav" onClick={raiseAreaEvent} data-value={crag.areaGuid}>{crag.areaName}</span> / <span className="crumb-leaf">{crag.cragName}</span>
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