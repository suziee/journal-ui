import React from 'react';
import { getByKeyword } from '../../api';
import { Route } from '../../models';

export default function useKeyword(args) {
    const [keyword, setKeyword] = React.useState(null);
    const [keywordEntries, setKeywordEntries] = React.useState([]);

    function updateKeyword(newKeyword) {
        if (newKeyword != null && newKeyword == keyword) {
            getByKeywordEntries();
        }

        setKeyword(x => newKeyword);
    }

    React.useEffect(() => {
        if (keyword == null) {
            return;
        }

        getByKeywordEntries();
    }, [keyword]);

    function getByKeywordEntries() {
        async function getDataAsync() {
            let routes = await getByKeyword(keyword);

            routes = routes.map(x => new Route(x));

            setKeywordEntries(x => routes);
        }

        getDataAsync();
    }

    return {
        keyword: keyword,
        updateKeyword: updateKeyword,
        keywordEntries: keywordEntries,
    };
}