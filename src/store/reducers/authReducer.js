import {
    LOAD_USER,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGOUT,
    AUTH_ERROR
} from "../actions/types";

const initState = {
    isAuthenticated: false,
    user: {},
    errors: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                errors: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                errors: null
            };
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                errors: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                errors: null
            };
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                errors: null
            };
        default:
            return state;
    }
};
