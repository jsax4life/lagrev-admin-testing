/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer, useEffect } from 'react';

export const SearchResultContext = createContext<ApContext>({});

const searchResultReducer = (state: any, action: { type: any; searchResult: any }) => {
    switch (action.type) {
        case 'STORE_SEARCH_DATA': {
            return action.searchResult;
        }
        default:
            return state;
    }
};

const SearchResultContextProvider = (props: {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
    const [searchResult, dispatch] = useReducer(searchResultReducer, [], () => {
        const localData = localStorage.getItem('searchResult');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('searchResult', JSON.stringify(searchResult));
    }, [searchResult]);

    return <SearchResultContext.Provider value={{ searchResult, dispatch }}>{props.children}</SearchResultContext.Provider>;
};
interface ApContext {
    searchResult?: any;
    dispatch?: any;
}

export default SearchResultContextProvider;
