import axios from "axios";
import jwtDecode from "jwt-decode";
import {
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGOUT,
    LOAD_USER,
    AUTH_ERROR
} from "./types";
import setAuthToken from "../../utils/AuthTokenUtils";

export const register = async user => {
    try {
        const res = await axios.post("/api/rest-auth/register/", user);

        return {
            type: REGISTER_SUCCESS,
            payload: res.data
        };
    } catch (err) {
        return {
            type: AUTH_ERROR,
            payload: err.response.data
        };
    }
};

export const login = async user => {
    try {
        const res = await axios.post("/api/token-auth/", user);

        // Create and set token in header and local storage
        const { token } = res.data;
        localStorage.setItem("token", token);
        setAuthToken(token);

        // Decode token to get user data
        const decoded = jwtDecode(token);
        return {
            type: LOGIN_SUCCESS,
            payload: decoded
        };
    } catch (err) {
        return {
            type: AUTH_ERROR,
            payload: { message: "Username and/or password is incorrect" }
        };
    }
};

export const loadUser = () => {
    try {
        const token = localStorage.token;

        // Check if token expired
        let decoded = jwtDecode(token);
        const currentTime = new Date().getTime() / 1000;
        if (decoded.exp <= currentTime) {
            (async () => {
                decoded = await refreshToken(token);
            })();
        }

        // Set state with decoded token
        return {
            type: LOAD_USER,
            payload: decoded
        };
    } catch (err) {
        // No token found
        return { type: LOGOUT };
    }
};

export const logout = () => {
    // Remove token from localStorage and header
    localStorage.removeItem("token");
    setAuthToken(false);

    return { type: LOGOUT };
};

const refreshToken = async token => {
    // Remove token from local storage
    localStorage.removeItem("token");

    const res = await axios.post("/api/token-refresh/", token);

    // Set new token in local storage and header
    const newToken = res.data.token;
    localStorage.setItem("token", newToken);
    setAuthToken(newToken);

    // Decode token and return
    return jwtDecode(token);
};
