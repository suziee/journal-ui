import React from 'react';
import './areaPage.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { DeleteIcon } from '../Button';

export function AreaPage(props) {
    const messenger = useAppData(NAME.useMessenger);
    const deleteHub = useAppData(NAME.useDeleteHub);
    const {area, delete: deleteArea} = useAppData(NAME.useArea);
    const {get: getCrag} = useAppData(NAME.useCrag);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.AREA_PAGE));
    }, [current]);

    async function raiseCragEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getCrag(guid);
        messenger.broadcast(SUB.SHOW_CRAG);
    }

    function raiseEditEvent(event) {
        messenger.broadcast(SUB.UPDATE_AREA);
    }

    function raiseAddEvent(event) {
        messenger.broadcast(SUB.ADD_CRAG);
    }

    async function raiseDeleteEvent(event) {
        const isSuccessful = await deleteArea(area.areaGuid);
        if (isSuccessful) messenger.broadcast(SUB.DELETED_AREA);
    }

	function build() {
		if (area == null) return;
		
		return <React.Fragment>
			<div className="header">
                <header>Area: {area.areaName}</header>
                <div className="header-buttons">
                    <span className="material-symbols-outlined size-24 green" onClick={raiseEditEvent}>edit</span>
                    <DeleteIcon parentType={COMP.AREA_PAGE} eventHandler={raiseDeleteEvent} />
                </div>
            </div>
            <div>
                <header><span className="text-button add" onClick={raiseAddEvent}>add</span> Crags:</header>
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