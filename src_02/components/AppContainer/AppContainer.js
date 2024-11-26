import React from 'react';
import './appContainer.css';
import Navbar from '../Navbar';
import SearchPage from '../SearchPage';
import {AreaForm, AreaPage} from '../Area';
import {CragPage, CragForm} from '../Crag';
import {RoutePage, RouteForm} from '../Route';
import CalendarPage from '../CalendarPage';

export default function AppContainer(props) {
    return (
        <React.Fragment>
            <div id="app">
                <Navbar />
                <div id="main">
                    <SearchPage />
					<AreaPage />
                    <CragPage />
                    <RoutePage />
                    <CalendarPage />
                    <AreaForm />
                    <CragForm />
                    <RouteForm />
                    {/* <StatsPage />
                    <FormPage /> */}
                </div>
            </div>
        </React.Fragment>
    );
}