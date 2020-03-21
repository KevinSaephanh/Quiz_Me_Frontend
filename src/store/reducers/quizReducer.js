import {
    GET_QUIZZES,
    GET_QUIZ,
    CREATE_QUIZ,
    UPDATE_QUIZ,
    DELETE_QUIZ,
    QUIZ_ERROR
} from "../actions/types";

const initState = {
    quizzes: [],
    quiz: {},
    errors: ""
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload,
                errors: null
            };
        case GET_QUIZ:
            return {
                ...state,
                quiz: action.payload,
                errors: null
            };
        case CREATE_QUIZ:
            return {
                ...state,
                quizzes: [action.payload, ...state.quizzes]
            };
        case UPDATE_QUIZ:
            return {
                ...state,
                quiz: action.payload
            };
        case DELETE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.filter(
                    quiz => quiz._id !== action.payload
                )
            };
        case QUIZ_ERROR:
            return {
                ...state,
                quizzes: null,
                quiz: null,
                errors: action.payload
            };
        default:
            return state;
    }
};
