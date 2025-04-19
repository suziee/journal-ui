import React from 'react';

export default function RouteTypeSelector(props) {
    const {name, id} = props;

    return <>
        <select name={name} id={id}>
            <option value="Trad">Trad</option>
            <option value="Sport">Sport</option>
            <option value="Boulder">Boulder</option>
            <option value="Hike">Hike</option>
            <option value="Gym">Gym</option>
            <option value="TR">TR (Top Rope)</option>
            <option value="Mixed">Mixed</option>
        </select>
    </>;
}