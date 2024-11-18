import React from 'react';
import './cragPage.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';

export function CragPage(props) {
    const {crag} = useAppData(NAME.useCrag);
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
    }

    async function raiseRouteEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getRoute(guid);
        show(COMP.ROUTE_PAGE);
    }
	
	function build() {
		if (crag == null) return;
		
		return <React.Fragment>
			<header>
                Crag: <span className="crumb-nav" onClick={raiseAreaEvent} data-value={crag.areaGuid}>{crag.areaName}</span> / <span className="crumb-leaf">{crag.cragName}</span>
            </header>
            {/* <p>{crag.notes}</p> */}
            <p>Underworld are a British electronic music group formed in 1987 in Cardiff, Wales[1] and the principal collaborative project of Karl Hyde and Rick Smith. Prominent former members include Darren Emerson, from 1990 to 2000, and Darren Price, as part of the live band from 2005 to 2016.</p>
            <div>
                <header><span className="text-button">add</span> Routes:</header>
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
        <div style={open ? null : {display: "none"}}>
			{build()}
        </div>
    );
}