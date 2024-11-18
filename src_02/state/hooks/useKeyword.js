import React from 'react';
import { getByKeyword } from '../../api';

export default function useKeyword(args) {
    const [keyword, setKeyword] = React.useState(null);
    const [results, setResults] = React.useState([]);

    function updateKeyword(newKeyword) {
        if (newKeyword != keyword) {
            setKeyword(x => newKeyword);
        }
    }

    React.useEffect(() => {
        if (keyword == null) {
            return;
        }

        getResults();
    }, [keyword]);

    async function getResults() {
        let routes = await getByKeyword(keyword);
        setResults(x => routes);
    }

    return {
        keyword: keyword,
        updateKeyword: updateKeyword,
        results: results,
    };
}