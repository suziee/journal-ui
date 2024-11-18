 import React from 'react';
import './cragForm.css';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValue } from '../shared';

export function CragForm(props) {
    const {add, update, isAdd, crag} = useAppData(NAME.useCrag);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, hide, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.CRAG_FORM));
    }, [current]);

    React.useEffect(() => {
        if (isAdd) {
            setValue("cf-name", null);
        } else if (area != null) {
            setValue("cf-name", crag.cragName);
        }
    }, [isAdd])

    function raiseCancelEvent(event) {
        event.preventDefault();
        if (isAdd) setValue("cf-name", null);
        hide(COMP.AREA_FORM);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let _area = {   
            areaName: event.target.areaName.value
        };

        if (!isAdd) {
            _area = {..._area, areaGuid: area.areaGuid};
        }

        if (isAdd) {
            console.log(_area);
            // await add(area);
            // hide(COMP.AREA_FORM);
        } else {
            console.log(_area);
            // await update(area);
            // show(COMP.AREA_PAGE);
        }
    }

    return (
        <div className={open ? "area-form" : "hidden"}>
            <header>Add area</header>
            <form onSubmit={raiseSubmitEvent}>
                <label>Name:</label>
                <input name="areaName" id="af-name"/>

                <div className="form-buttons">
                    <button className="text-button red" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button green" type="submit">save</button>
                </div>
            </form>
            <ul className="form-errors">
                {errors.map((error, index) => {
                    return <li key={`form-error-${index}`}>{error}</li>
                })}
            </ul>
        </div>
    );
}