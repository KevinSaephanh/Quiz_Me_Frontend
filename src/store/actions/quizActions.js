import axios from "axios";
import {
    GET_QUIZZES,
    GET_QUIZ,
    CREATE_QUIZ,
    UPDATE_QUIZ,
    DELETE_QUIZ,
    QUIZ_ERROR
} from "./types";

export const getQuizzes = page => async dispatch => {
    try {
        const res = await axios.get(`/api/quizzes/page=${page}/`);
        return dispatch({
            type: GET_QUIZZES,
            payload: res.data
        });
    } catch (err) {
        return dispatch({
            type: QUIZ_ERROR,
            payload: err
        });
    }
};

export const getQuiz = id => async dispatch => {
    try {
        const res = await axios.get(`/api/quizzes/${id}/`);
        return dispatch({
            type: GET_QUIZ,
            payload: res.data
        });
    } catch (err) {
        return dispatch({
            type: QUIZ_ERROR,
            payload: err
        });
    }
};

export const createQuiz = (quiz, token) => async dispatch => {
    try {
        // Set token header and make post request
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token.key}`
        };
        axios.defaults.headers = headers;
        const res = await axios.post("/api/quizzes/create/", quiz);

        return dispatch({
            type: CREATE_QUIZ,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response);
        console.log(err.response.data);
        return dispatch({
            type: QUIZ_ERROR,
            payload: err
        });
    }
};

export const updateQuiz = quiz => async dispatch => {
    try {
        const res = await axios.post(`/api/quizzes/modify/${quiz.id}/`, quiz);
        return dispatch({
            type: UPDATE_QUIZ,
            payload: res.data
        });
    } catch (err) {
        return dispatch({
            type: QUIZ_ERROR,
            payload: err
        });
    }
};

export const deleteQuiz = id => async dispatch => {
    try {
        await axios.delete(`/api/quizzes/modify/${id}/`);
        return dispatch({
            type: DELETE_QUIZ,
            payload: id
        });
    } catch (err) {
        return dispatch({
            type: QUIZ_ERROR,
            payload: err
        });
    }
};
