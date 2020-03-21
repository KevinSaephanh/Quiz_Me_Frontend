import React, { Component } from "react";
import ReactCardFlip from "react-card-flip";

class QuestionCard extends Component {
    state = {
        flippedCard: false,
        question: {}
    };

    componentDidMount() {
        this.setState({
            question: this.props.question
        });
    }

    toggleCard = () => {
        this.setState({
            flippedCard: !this.state.flippedCard
        });
    };

    render() {
        const styles = {
            height: "300px",
            padding: "25px",
            border: "2px solid black",
            margin: "0 15px",
            fontSize: "1.1rem",
            fontWeight: "bold"
        };

        const pStyles = {
            height: "200px",
            lineHeight: "200px"
        };

        const { flippedCard, question } = this.state;

        return (
            <ReactCardFlip isFlipped={flippedCard} flipDirection="vertical">
                <div key="front" style={styles} onClick={this.toggleCard}>
                    <p style={pStyles}>{question.question}</p>
                </div>

                <div key="back" style={styles} onClick={this.toggleCard}>
                    <p style={pStyles}>{question.answer}</p>
                </div>
            </ReactCardFlip>
        );
    }
}

export default QuestionCard;
