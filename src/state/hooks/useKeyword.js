import React from 'react';
import { getByKeyword } from '../../api';
import { Route } from '../../models';
import * as SUB from './subscriptionKeys';
import { useKeyword as id } from './hookNames';

export default function useKeyword(args) {
    const {messenger} = args;
    const [keyword, setKeyword] = React.useState(null);
    const [keywordEntries, setKeywordEntries] = React.useState([]);

    messenger.subscribe(id, {
        [SUB.REFRESH_KEYWORD_ROUTES]: getByKeywordEntries,
    });

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

    async function getByKeywordEntries() {
        let routes = await getByKeyword(keyword);
        routes = routes.map(x => new Route(x));
        setKeywordEntries(x => routes);
    }

    return {
        keyword: keyword,
        updateKeyword: updateKeyword,
        keywordEntries: keywordEntries,
    };
}