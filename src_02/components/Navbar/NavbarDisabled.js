import React from 'react';
import './navbar.css';
import NavButtons from './NavButtons';

export default function NavbarDisabled(props) {
    const {icons} = props;

    function getButton({name}) {
        return (
            <div className="nav-button-disabled">
                <span className="material-symbols-outlined size-48">{name}</span>
            </div>
        );
    }

    return <NavButtons getButton={getButton} icons={icons} />
}