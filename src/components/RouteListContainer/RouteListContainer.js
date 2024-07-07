import React from 'react';
import './routeListContainer.css';
import { useAppData
    , hookNames as NAME
    , subscriptionKeys as SUB
} from '../../state';
import RouteList from '../RouteList';

export default function RouteListContainer(props) {
    const {updateKeyword} = useAppData(NAME.useKeyword);
    const messenger = useAppData(NAME.useMessenger);

    const keywordRef = React.useRef();

    function raiseSearchEvent() {
        updateKeyword(keywordRef.current.value);
    }

    function raiseAddEvent() {
        messenger.broadcast(SUB.HIDE_DATE_FORM);
        messenger.broadcast(SUB.HIDE_ROUTE);
        messenger.broadcast(SUB.SHOW_ROUTE_FORM);
    }

    return (
        <React.Fragment>
            <div className="custom-button big-custom-button" onClick={raiseAddEvent}>
                Add Route Journal Entry
            </div>
            <div id="keyword-form">
                <label>Key word or phrase:</label>
                <br/>
                <input type="text" ref={keywordRef}/>
                <button onClick={raiseSearchEvent}>Search</button>
            </div>
            <RouteList />
        </React.Fragment>
    )
}