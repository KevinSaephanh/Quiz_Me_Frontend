import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { createQuiz } from "../../store/actions/quizActions";
import QuestionForm from "../../components/QuestionForm";
import QuestionList from "../../components/QuestionList";
import CategoryDropdown from "../../components/CategoryDropdown/CategoryDropdown";
import { useDispatch } from "react-redux";
import "./CreateQuizPage.css";

const CreateQuizPage = props => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);

    const dispatch = useDispatch();

    const handleChange = e => {
        console.log(e.target.value);
    };

    const addQuestion = question => {
        setQuestions(questions => [...questions, question]);
    };

    const saveQuiz = e => {
        e.preventDefault();

        const { user } = props.user;
        const quiz = {
            title,
            questions,
            creator: user.username
        };

        props.saveQuiz(quiz, user.token);
        window.location.href = "/";
    };

    return (
        <div className="create-quiz-page">
            <Row className="set-title-row">
                <Col style={{ display: "flex" }}>
                    <label>Title: </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        maxLength="50"
                        required
                    />
                </Col>
                <Col>
                    <CategoryDropdown category={""} />
                </Col>
            </Row>
            <Row className="set-title-row">
                <label>Description: </label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    maxLength="250"
                    required
                />
            </Row>
            <Row>
                <QuestionForm addQuestion={addQuestion} />
            </Row>

            {/* <QuestionList questions={questions} /> */}
            <Button onClick={saveQuiz}>Save</Button>
        </div>
    );
};

export default CreateQuizPage;
