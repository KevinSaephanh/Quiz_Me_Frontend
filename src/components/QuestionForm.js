import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class QuestionForm extends Component {
    state = {
        question: "",
        answer: ""
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const { question, answer } = this.state;
        const newQuestion = {
            question,
            answer
        };

        // Send question to parent component
        this.props.addQuestion(newQuestion);
    };

    render() {
        return (
            <Form>
                <Form.Item label="Question">
                    <textarea
                        placeholder="Input question"
                        name="question"
                        onChange={this.onChange}
                        maxLength="300"
                        required
                    />
                </Form.Item>
                <Form.Item label="Answer">
                    <textarea
                        placeholder="Input answer"
                        name="answer"
                        onChange={this.onChange}
                        maxLength="300"
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.onSubmit}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default QuestionForm;
