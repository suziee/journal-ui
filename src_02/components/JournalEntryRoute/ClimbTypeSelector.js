import React from 'react';

export default function ClimbTypeSelector(props) {
    const {name, id} = props;

    return <>
        <select name={name} id={id}>
            <option value="TR">TR (Top Rope)</option>
            <option value="Lead">Lead</option>
            <option value="Follow">Follow</option>
            <option value="TR Solo">TR Solo (Top Rope Solo)</option>

        </select>
    </>;
}