import React from 'react';
import './route.css';
import {
    useAppData
    , hookNames as NAME
	, subscriptionKeys as SUB
} from '../../state';

export default function Route(props) {
	const {selectedRoute, journalEntries, open} = useAppData(NAME.useRoute);
	const messenger = useAppData(NAME.useMessenger);

	React.useEffect(() => {
		if (selectedRoute == null) return;

		messenger.broadcast(SUB.HIDE_DATE_FORM);
        messenger.broadcast(SUB.HIDE_ROUTE_FORM);
	}, [selectedRoute])

	function getHeader() {
		if (selectedRoute == null) {
			return;
		}

		return (
			<div id="route-header">
				<span id="route-crumbs">{selectedRoute.location} / <span id="route-name">{selectedRoute.routeName}</span></span>
				<br/>
				{selectedRoute.routeType}, {selectedRoute.numberOfPitches} pitches, {selectedRoute.bookGrade} (book), {selectedRoute.mountainProjectGrade} (mp)
			</div>
		);
	}

	function getDates() {
		if (journalEntries == null || journalEntries.length == 0) {
			return;
		}

		return journalEntries.map((entry, index) => {
			return (
				<div className="date-entry" key={`date-entry-${index}`}>
					<div className="date">{entry.date}</div>
					<div><b>Pitches:</b> {entry.pitchesClimbed} / {entry.numberOfPitches}</div>
					<div className="notes">
						<b>Notes:</b> {entry.notes}
					</div>
				</div>
			)
		});
	}

	function raiseClickEvent() {
		messenger.broadcast(SUB.HIDE_ROUTE_FORM);
		messenger.broadcast(SUB.HIDE_ROUTE);
		messenger.broadcast(SUB.SHOW_DATE_FORM);
	}

    return (
		<div id={open ? "route-container" : "route-container-hidden"}>
			{getHeader()}
			<div id="add-date-entry-button" onClick={raiseClickEvent}>
				Add Date Entry
			</div>
			{getDates()}
		</div>
    );
}