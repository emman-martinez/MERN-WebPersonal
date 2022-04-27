import React, { createContext ,useEffect, useState} from 'react';
import { logout, tokenRenew } from '../api/user';
import { ACCESS_TOKEN } from '../utils/constants';

const AuthContext = createContext();

function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState({
        isLoading: true,
        user: null,
    });

    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    return <AuthContext.Provider value={ user }>{ children }</AuthContext.Provider>;
};

const checkUserLogin = async(setUser) => {
    const result = await tokenRenew();
    const { accessToken } = result; 

    if (result.msg) {
        logout();
        setUser({
            isLoading: true,
            user: null,
        });
    } else {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        setUser({
            isLoading: false,
            user: result,
        });
    }
}

export {
    AuthContext,
    AuthProvider,
};

