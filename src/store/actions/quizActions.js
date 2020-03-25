import axios from "axios";
import {
    GET_QUIZZES,
    GET_QUIZ,
    CREATE_QUIZ,
    UPDATE_QUIZ,
    DELETE_QUIZ,
    QUIZ_ERROR
} from "./types";

export const getQuizzes = async page => {
    try {
        const res = await axios.get(`/api/quizzes/page=${page}/`);
        return {
            type: GET_QUIZZES,
            payload: res.data
        };
    } catch (err) {
        return {
            type: QUIZ_ERROR,
            payload: err
        };
    }
};

export const getQuiz = async id => {
    try {
        const res = await axios.get(`/api/quizzes/${id}/`);
        return {
            type: GET_QUIZ,
            payload: res.data
        };
    } catch (err) {
        return {
            type: QUIZ_ERROR,
            payload: err
        };
    }
};

export const createQuiz = async (quiz, token) => {
    try {
        // Set token header and make post request
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token.key}`
        };
        axios.defaults.headers = headers;
        const res = await axios.post("/api/quizzes/create/", quiz);

        return {
            type: CREATE_QUIZ,
            payload: res.data
        };
    } catch (err) {
        return {
            type: QUIZ_ERROR,
            payload: err
        };
    }
};

export const updateQuiz = async quiz => {
    try {
        const res = await axios.post(`/api/quizzes/modify/${quiz.id}/`, quiz);
        return {
            type: UPDATE_QUIZ,
            payload: res.data
        };
    } catch (err) {
        return {
            type: QUIZ_ERROR,
            payload: err
        };
    }
};

export const deleteQuiz = async id => {
    try {
        await axios.delete(`/api/quizzes/modify/${id}/`);
        return {
            type: DELETE_QUIZ,
            payload: id
        };
    } catch (err) {
        return {
            type: QUIZ_ERROR,
            payload: err
        };
    }
};
