import React from 'react';
import './searchPage.css';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';

export default function SearchPage(props) {
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.SEARCH_PAGE));
    }, [current]);

    return (
        <div className={open ? "search-container" : "hidden"}>
            <SearchForm />
            <SearchResults />
        </div>
    );
}