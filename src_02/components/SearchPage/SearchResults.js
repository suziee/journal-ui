import React from 'react';
import { useAppData
    , hookNames as NAME
    , subscriptionKeys as SUB
    , componentNames as COMP
} from '../../state';

export default function SearchResults(props) {
    //https://stackoverflow.com/questions/57065348/destructuring-and-rename-property

    const {get: getArea} = useAppData(NAME.useArea);
    const {get: getCrag} = useAppData(NAME.useCrag);
    const {get: getRoute} = useAppData(NAME.useRoute);
    const messenger = useAppData(NAME.useMessenger);

    const {results, keyword} = useAppData(NAME.useKeyword);

    async function gotoPage(result) {
		//const result = event.target.getAttribute("data-value");

        // messenger.broadcast(SUB.HIDE_SEARCH);

        if (result.isArea) {
            await getArea(result.guid);
            messenger.broadcast(SUB.SHOW_AREA);
        } else if (result.isCrag) {
            await getCrag(result.guid);
            messenger.broadcast(SUB.SHOW_CRAG);
        } else if (result.isRoute) {
            await getRoute(result.guid);
            messenger.broadcast(SUB.SHOW_ROUTE);
        }
    }

    function buildSearchResults() {
        if (keyword == null) return null;

		if (results == null || results.length == 0) return "No results found."
		
		return results.map((result, index) => {
			return (
				<li key={result.guid} onClick={() => gotoPage(result)}>
					{result.name} ({result.isArea ? "Area" : (result.isCrag ? "Crag" : (result.isRoute ? "Route" : null))})
				</li>
			);
		});
    }

    return (
        <div id="search-results">
            <ul>{buildSearchResults()}</ul>
        </div>   
    )
}