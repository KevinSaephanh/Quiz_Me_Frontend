import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const QuestionForm = props => {
    const [inputs, setInputs] = useState({
        question: "",
        answer: ""
    });

    const { question, answer } = inputs;

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newQuestion = {
            question,
            answer
        };

        // Send question to parent component
        props.addQuestion(newQuestion);
    };

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="text"
                            name="question"
                            value={question}
                            onChange={handleChange}
                            maxLength="300"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Answer</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="text"
                            name="answer"
                            value={answer}
                            onChange={handleChange}
                            maxLength="300"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Button type="primary" onClick={handleSubmit}>
                        Add (+)
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default QuestionForm;
