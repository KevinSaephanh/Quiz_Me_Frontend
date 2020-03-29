import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { createQuiz } from "../../store/actions/quizActions";
import QuestionForm from "../../components/QuestionForm";
import QuestionList from "../../components/QuestionList";
import { useDispatch } from "react-redux";

const CreateQuizPage = props => {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);

    const dispatch = useDispatch();

    const handleChange = e => {};

    const addQuestion = question => {
        setQuestions(questions => [...questions, question]);
    };

    const createQuiz = e => {
        e.preventDefault();

        const { user } = props.user;
        const quiz = {
            title,
            questions,
            creator: user.username
        };

        props.createQuiz(quiz, user.token);
        window.location.href = "/";
    };

    return (
        <div>
            <Row>
                <Col span={12}>
                    <h3>Create a Quiz</h3>
                </Col>
            </Row>

            <QuestionForm addQuestion={addQuestion} />
            {/* <QuestionList questions={questions} /> */}
            <Button onClick={createQuiz}>Create</Button>
        </div>
    );
};

export default CreateQuizPage;
