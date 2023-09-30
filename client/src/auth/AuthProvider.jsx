import { useContext, createContext, useState, useEffect } from "react";
import { API_URL } from './constants.js';

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => { },
    saveUser: (userData) => { },
    getRefreshToken: () => { },
    getUser: () => { },
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const requestNewAccessToken = async (refreshToken) => {
        try {
            const response = await fetch(`${API_URL}/refresh-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON",
                    "Authorization": `Bearer ${refreshToken}`,
                },
            });
            if (response.ok) {
                const json = await response.json();
                if (json.error) {
                    throw new Error(json.error);
                }
                return json.body.accessToken;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const getUserInfo = async (accessToken) => {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/JSON",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                const json = await response.json();
                if (json.error) {
                    throw new Error(json.error);
                }
                return json.body;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const checkAuth = async () => {
        if (accessToken) {
            const userInfo = await getUserInfo(accessToken);
                    if (userInfo) {
                        saveSessionInfo(
                            userInfo,
                            accessToken,
                            getRefreshToken()
                        );
                        setIsLoading(false);
                        return ;
                    }
        } else {
            const token = getRefreshToken();
            if (token) {
                const newAccessToken = await requestNewAccessToken(token);
                if (newAccessToken) {
                    const userInfo = await getUserInfo(newAccessToken);
                    if (userInfo) {
                        saveSessionInfo(
                            userInfo,
                            newAccessToken,
                            token
                        );
                        setIsLoading(false);
                        return ;
                    }
                }
            }
        }
        setIsLoading(false);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("token");
    };

    const saveSessionInfo = (userInfo, accessToken, refreshToken) => {
        setAccessToken(accessToken);
        setUser(userInfo);
        localStorage.setItem("token", JSON.stringify(refreshToken));
        setIsAuthenticated(true);
    };

    const getAccessToken = () => {
        return accessToken;
    };

    const getRefreshToken = () => {
        const tokenData = localStorage.getItem("token");
        if (tokenData) {
            const token = JSON.parse(tokenData);
            return token;
        }
        return null;
    };

    const saveUser = (userData) => {
        saveSessionInfo(
            userData.body.user,
            userData.body.accessToken,
            userData.body.refreshToken
        );
    };

    const getUser = () => {
        return user;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, logout }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);