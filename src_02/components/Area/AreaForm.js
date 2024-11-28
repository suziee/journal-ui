import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValue } from '../shared';

export function AreaForm(props) {
    const {add, update, isAdd, area} = useAppData(NAME.useArea);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, hide, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.AREA_FORM));
    }, [current]);

    React.useEffect(() => {
        if (isAdd) {
            setValue("af-name", null);
        } else if (area != null) {
            setValue("af-name", area.areaName);
        }
    }, [isAdd, area])

    function raiseCancelEvent(event) {
        event.preventDefault();
        if (isAdd) setValue("af-name", null);
        hide(COMP.AREA_FORM);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {
            areaName: event.target.areaName.value
        };

        if (!isAdd) {
            request = {...request, areaGuid: area.areaGuid};
        }

        let isSuccessful = isAdd ? await add(request) : await update(request);
        if (isSuccessful) show(COMP.AREA_PAGE);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Add area</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Name:</label>
                    <input name="areaName" id="af-name"/>
                </div>
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