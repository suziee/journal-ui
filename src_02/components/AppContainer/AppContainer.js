import React from 'react';
import './appContainer.css';
import Navbar from '../Navbar';
import SearchPage from '../SearchPage';
import {AddAreaForm, AreaPage, EditAreaForm} from '../Area';
import {CragPage, AddCragForm, EditCragForm} from '../Crag';
import {RoutePage, AddRouteForm, EditRouteForm} from '../Route';
import CalendarPage from '../CalendarPage';
import { AddJournalEntryForm, EditJournalEntryForm, JournalEntryPage } from '../JournalEntry';
import { AddJournalEntryRouteForm, EditJournalEntryRouteForm } from '../JournalEntryRoute';

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
                    <JournalEntryPage />
                    <AddAreaForm />
                    <EditAreaForm />
                    <AddCragForm />
                    <EditCragForm />
                    <AddRouteForm />
                    <EditRouteForm />
                    <AddJournalEntryForm />
                    <EditJournalEntryForm />
                    <AddJournalEntryRouteForm />
                    <EditJournalEntryRouteForm />
                    {/* <StatsPage />
                    <FormPage /> */}
                </div>
            </div>
        </React.Fragment>
    );
}