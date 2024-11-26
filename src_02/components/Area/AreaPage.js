import React from 'react';
import './areaPage.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';

export function AreaPage(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {area} = useAppData(NAME.useArea);
    const {get: getCrag} = useAppData(NAME.useCrag);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.AREA_PAGE));
    }, [current]);

    async function raiseCragEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getCrag(guid);
        show(COMP.CRAG_PAGE);
    }

    function raiseEditEvent(event) {
        messenger.broadcast(SUB.UPDATE_AREA);
        show(COMP.AREA_FORM);
    }

    function raiseAddEvent(event) {
        messenger.broadcast(SUB.ADD_CRAG);
        show(COMP.CRAG_FORM);
    }

	function build() {
		if (area == null) return;
		
		return <React.Fragment>
			<div className="header">
                <header>Area: {area.areaName}</header>
                <div className="header-buttons">
                    <span className="material-symbols-outlined size-24 green" onClick={raiseEditEvent}>edit</span>
                    <span className="material-symbols-outlined size-24 red">delete</span>
                </div>
            </div>
            <div>
                <header><span className="text-button" onClick={raiseAddEvent}>add</span> Crags:</header>
                <ul id="crags">
                    {area.crags.map((crag, index) => {
                        return <li key={crag.cragGuid} data-value={crag.cragGuid} onClick={raiseCragEvent}>
                            {crag.cragName}
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