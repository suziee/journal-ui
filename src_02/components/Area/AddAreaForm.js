import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValue, getValueOrDefault } from '../shared';

export function AddAreaForm(props) {
    const {add} = useAppData(NAME.useArea);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, hide, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.ADD_AREA_FORM));
        setValue("af-name", null);
    }, [current]);

    function raiseCancelEvent(event) {
        event.preventDefault();
        setValue("af-name", null);
        hide(COMP.ADD_AREA_FORM);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {
            areaName: getValueOrDefault(event.target.areaName.value),
        };

        let isSuccessful = await add(request);
        if (isSuccessful) show(COMP.AREA_PAGE);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Add Area</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Name:</label>
                    <input name="areaName" id="af-name"/>
                </div>
                <div className="form-buttons">
                    <button className="text-button cancel" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button save" type="submit">save</button>
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