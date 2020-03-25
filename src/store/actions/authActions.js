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
            payload: { msg: "Incorrect username/password" }
        };
    }
};

export const loadUser = () => {
    try {
        const token = JSON.parse(localStorage.token);

        // Reset auth state if local storage does not contain user
        if (!token) {
            return { type: LOGOUT };
        } else {
            // Check if token expired
            const decoded = jwtDecode(token);
            const expirationDate = new Date(decoded.exp);
            if (expirationDate <= new Date()) {
                // Remove token from local storage
                localStorage.removeItem("token");

                return { type: LOGOUT };
            } else {
                // Set state with user data
                return {
                    type: LOAD_USER,
                    payload: decoded
                };
            }
        }
    } catch (err) {
        return {
            type: AUTH_ERROR,
            payload: err
        };
    }
};

export const logout = () => {
    // Remove token from localStorage and header
    localStorage.removeItem("token");
    setAuthToken(false);

    return { type: LOGOUT };
};
