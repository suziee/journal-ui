import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValue, getValueOrDefault } from '../shared';

export function EditAreaForm(props) {
    const {update, area} = useAppData(NAME.useArea);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.EDIT_AREA_FORM));
    }, [current]);

    React.useEffect(() => {
        if (area != null) {
            setValue("af-name-edit", area.areaName);
        }
    }, [area])

    function raiseCancelEvent(event) {
        event.preventDefault();
        setValue("af-name-edit", area.areaName);
        show(COMP.AREA_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {
            areaName: getValueOrDefault(event.target.areaName.value),
            areaGuid: area.areaGuid,
        };

        let isSuccessful = await update(request);
        if (isSuccessful) show(COMP.AREA_PAGE);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Edit Area</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Name:</label>
                    <input name="areaName" id="af-name-edit"/>
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