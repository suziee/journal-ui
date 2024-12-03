import React from 'react';
import { useAppData, hookNames as NAME, componentNames as COMP } from '../../state';

export function JournalEntryRoutePage(props) {
    const {journalEntryRoute: jer} = useAppData(NAME.useJournalEntryRoute);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.JOURNAL_ENTRY_ROUTE_PAGE));
    }, [current]);
	

    function build() {
		if (jer == null) return;
		
		return <React.Fragment>
			<div className="header">
                <header>Journal Entry: {jer.date} / {jer.routeName}</header>
                <div className="header-buttons">
                    <span className="material-symbols-outlined size-24 green">edit</span>
                    <span className="material-symbols-outlined size-24 red">delete</span>
                </div>
            </div>
            <p>{jer.notes}</p>
            {/* <div>
                
                <header><span className="text-button" onClick={raiseAddEvent}>add</span> Crags:</header>
                <ul id="crags">
                    {area.crags.map((crag, index) => {
                        return <li key={crag.cragGuid} data-value={crag.cragGuid} onClick={raiseCragEvent}>
                            {crag.cragName}
                        </li>
                    })}
                </ul>
            </div> */}
        </React.Fragment>;
	}

    return (
        <div className={open ? "visible" : "hidden"}>
            {build()}
        </div>
    );
}