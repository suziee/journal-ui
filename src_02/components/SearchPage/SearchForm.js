import React from 'react';
import { useAppData
    , hookNames as NAME
    , subscriptionKeys as SUB
} from '../../state';

export default function SearchForm(props) {
    const {updateKeyword} = useAppData(NAME.useKeyword);
    const messenger = useAppData(NAME.useMessenger);

    const keywordRef = React.useRef();

    async function raiseSearchEvent() {
        await updateKeyword(keywordRef.current.value);
    }

    document.getElementById("search-bar")?.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            raiseSearchEvent();
        }
    })

    return (
        <div id="search-form">
            <input
                id="search-bar"
                placeholder="keyword / such as / location / crag / or route name, or all-crags, or all-routes"
                ref={keywordRef}/>
            <div className="icon-button" onClick={raiseSearchEvent}>
                <span className="material-symbols-outlined">search</span>
            </div>
        </div>
    );
}