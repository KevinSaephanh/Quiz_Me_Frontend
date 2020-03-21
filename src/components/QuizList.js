import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

import { connect } from "react-redux";
import { getQuizzes, getQuiz } from "../store/actions/quizActions";

import PropTypes from "prop-types";

class QuizList extends Component {
    state = {
        quizzes: []
    };

    async componentDidMount() {
        // Retrieve quizzes
        if (!this.props.quizzes.length) {
            await this.props.getQuizzes();
        }

        // Set state from retrieved quizzes
        const quizzes = this.props.quizzes;
        this.setState({
            quizzes
        });
    }

    onClick = async e => {
        const id = e.target.value;
        await this.props.getQuiz(id);

        window.location.href = `/quizzes/${id}`;
    };

    render() {
        const { quizzes } = this.state;

        return (
            <ListGroup
                header={<div>Quiz ListGroup</div>}
                bordered
                itemLayout="vertical"
                pagination={{ pageSize: 7 }}
                style={{ marginTop: "100px" }}
                dataSource={quizzes}
                renderItem={(quiz, i) => (
                    <ListGroup.Item
                        onClick={this.onClick}
                        key={i}
                        value={quiz.id}
                        style={{ cursor: "pointer" }}
                    >
                        {quiz.title}
                    </ListGroup.Item>
                )}
            ></ListGroup>
        );
    }
}

QuizList.propTypes = {
    getQuizzes: PropTypes.func.isRequired,
    getQuiz: PropTypes.func.isRequired,
    quizzes: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        quizzes: state.quiz.quizzes
    };
};

export default connect(mapStateToProps, { getQuizzes, getQuiz })(QuizList);
