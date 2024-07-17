/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer, useEffect } from 'react';

export const UserContext = createContext<MyContext>({});

const userReducer = (state: any, action: { type: any; user: any; action: { data: any, firstLogin: any }, legible: any }) => {
    switch (action.type) {
        case 'STORE_USER_DATA': {
            console.log('true')
            return action.user;
        }

        case 'UPDATE_USER': {
            return { ...state, first_login: action?.action?.firstLogin};
        }

        case 'UPDATE_MARCHANT_USER': {
            return { ...state, data: action?.action?.data};
        }

        case 'UPDATE_USER_NOTIFICATION': {
            return { ...state, notification: action.action };
        }

        case 'SIGNOUT': {
            return [];
        }
        default:
            return state;
    }
};

const UserContextProvider = (props: {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
    const [user, userDispatch] = useReducer(userReducer, [], () => {
        const localData = localStorage.getItem('user');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return <UserContext.Provider value={{ user, userDispatch }}>{props.children}</UserContext.Provider>;
};

interface MyContext {
    user?: any;
    userDispatch?: any;
}

export default UserContextProvider;
