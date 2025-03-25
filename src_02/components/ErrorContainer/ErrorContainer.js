import React from 'react';
import { useAppData, hookNames as NAME } from '../../state';

export function ErrorContainer(props) {
    const {errors} = useAppData(NAME.useError);

    return <ul className={errors == null || errors.length == 0 ? "hidden" : "form-errors"}>
        {errors.map((error, index) => {
            return <li key={`form-error-${index}`}>{error}</li>
        })}
    </ul>
}