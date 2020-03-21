import axios from "axios";
import {
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGOUT,
    LOAD_USER,
    AUTH_ERROR
} from "./types";

export const register = user => async dispatch => {
    try {
        const res = await axios.post("/api/rest-auth/register/", user);

        return dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        return dispatch({
            type: AUTH_ERROR,
            payload: err.response.data
        });
    }
};

export const login = user => async dispatch => {
    try {
        const res = await axios.post("/api/token-auth/", user);
        const token = res.data;
        const auth = {
            username: user.username,
            token,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };

        return dispatch({
            type: LOGIN_SUCCESS,
            payload: auth
        });
    } catch (err) {
        return dispatch({
            type: AUTH_ERROR,
            payload: { msg: "Incorrect username/password" }
        });
    }
};

export const loadUser = () => async dispatch => {
    try {
        // Parse user data from local storage
        const user = JSON.parse(localStorage.auth);

        // Reset auth state if local storage does not contain user
        if (!user) {
            return dispatch({
                type: LOGOUT
            });
        } else {
            // Check if token expired
            const expirationDate = new Date(user.expirationDate);
            if (expirationDate <= new Date()) {
                return dispatch({
                    type: LOGOUT
                });
            } else {
                // Set state with user data
                return dispatch({
                    type: LOAD_USER,
                    payload: user
                });
            }
        }
    } catch (err) {
        return dispatch({
            type: AUTH_ERROR,
            payload: err
        });
    }
};

export const logout = () => dispatch => {
    return dispatch({
        type: LOGOUT
    });
};
