import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, pwd) => {}
});

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // depenency array is empty --> useEffect only run once (after init load of component)
    useEffect( () => {
        const storeLoggedIn = localStorage.getItem('isLoggedIn');
        if (storeLoggedIn === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }

    const loginHandler = (email, pswd) => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
