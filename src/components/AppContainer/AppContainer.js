import React from 'react';
import './appContainer.css';
import Route from '../Route';
import RouteForm from '../RouteForm';
import RouteDateForm from '../RouteDateForm';
import CalendarContainer from '../CalendarContainer';
import RouteListContainer from '../RouteListContainer';

export default function AppContainer(props) {
    return (
        <React.Fragment>
            <div id="header-container">
                <header>
                    <div id="header-logo">Climbing Journal</div>
                </header>
            </div>
            <div id="main-container">
                <div id="calendar" className="grid-item">
                    <CalendarContainer/>
                </div>
                <div id="route-list" className="grid-item">
                    <RouteListContainer />
                </div>
                <div id="route" className="grid-item">
                    <Route />
                    <RouteForm />
                    <RouteDateForm />
                </div>
            </div>
        </React.Fragment>
    );
}