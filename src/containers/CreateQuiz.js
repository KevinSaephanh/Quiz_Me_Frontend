import React, { Component } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import { connect } from "react-redux";
import { createQuiz } from "../store/actions/quizActions";

import QuestionForm from "../components/QuestionForm";
import QuestionList from "../components/QuestionList";

import PropTypes from "prop-types";

class CreateQuiz extends Component {
    state = {
        title: "",
        questions: []
    };

    componentDidUpdate() {
        if (!this.props.user.isAuthenticated) {
            this.props.history.push("/login");
        }
    }

    onChange = e => {
        e.preventDefault();

        this.setState({
            title: e.target.value
        });
    };

    addQuestion = question => {
        const { questions } = this.state;
        questions.push(question);

        this.setState({
            questions
        });
    };

    createQuiz = e => {
        e.preventDefault();

        const { title, questions } = this.state;
        const { user } = this.props.user;
        const quiz = {
            title,
            questions,
            creator: user.username
        };

        this.props.createQuiz(quiz, user.token);
        window.location.href = "/";
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h3 style={{ paddingLeft: "15px" }}>Create a Quiz</h3>
                    </Col>
                    <Col span={12}>
                        <Button onClick={this.createQuiz}>Create</Button>
                    </Col>
                </Row>
                <Form.Item label="Title">
                    <InputGroup
                        placeholder="Input title"
                        name="title"
                        onChange={this.onChange}
                    />
                </Form.Item>
                <QuestionForm addQuestion={this.addQuestion} />
                <QuestionList questions={this.state.questions} />
            </div>
        );
    }
}

CreateQuiz.propTypes = {
    createQuiz: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps, { createQuiz })(CreateQuiz);
