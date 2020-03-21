import React, { Component } from "react";
import { Carousel, Button, Row } from "react-bootstrap";

import { connect } from "react-redux";
import { getQuiz } from "../store/actions/quizActions";

import QuestionList from "../components/QuestionList";
import QuestionCard from "../components/QuestionCard";

import PropTypes from "prop-types";

class QuizDetail extends Component {
    state = {
        quiz: {},
        questions: [],
        activeIndex: 0
    };

    carousel = React.createRef();

    async componentDidMount() {
        // Retrieve specifc quiz using id
        await this.props.getQuiz(this.props.match.params.id);
        const { quiz } = this.props.quiz;

        // Set state from retrieved quiz
        this.setState({
            quiz,
            questions: quiz.questions
        });
    }

    next = () => {
        this.carousel.next();
    };

    prev = () => {
        this.carousel.prev();
    };

    render() {
        const { quiz, questions } = this.state;

        const slides = questions.map((question, i) => {
            return <QuestionCard question={question} key={i} />;
        });

        return (
            <div>
                <h1 style={{ fontSize: "3rem" }}>{quiz.title}</h1>
                <h2 style={{ fontSize: "1.8rem", paddingBottom: "25px" }}>
                    By {quiz.creator}
                </h2>
                <h2>Hover over the card to see answer</h2>
                <Carousel
                    ref={node => (this.carousel = node)}
                    style={{
                        width: "500px",
                        margin: "0 auto"
                    }}
                >
                    {slides}
                </Carousel>
                <Row style={{ display: "flex", margin: "25px 0" }}>
                    <Button type="left-circle" onClick={this.prev} />
                    <Button type="right-circle" onClick={this.next} />
                </Row>
                <QuestionList questions={questions} />
            </div>
        );
    }
}

QuizDetail.propTypes = {
    quiz: PropTypes.object.isRequired,
    getQuiz: PropTypes.func.isRequired
};

const mapStatetoProps = state => {
    return {
        quiz: state.quiz
    };
};

export default connect(mapStatetoProps, { getQuiz })(QuizDetail);
