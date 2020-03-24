import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import Coffee from "../../images/coffee.jpeg";
import Notebook from "../../images/notebook.jpeg";
import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <Row>
                <Col>
                    <ul>
                        <li>
                            <h1>Welcome to QuizMe!</h1>
                        </li>
                        <li>
                            <p>
                                Browse through a variety of quizzes created by
                                other users.
                                <br></br>Or make your own quiz by registering
                                today!
                            </p>
                        </li>
                    </ul>
                </Col>
                <Col>
                    <Image src={Notebook} roundedCircle />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Image src={Coffee} rounded />
                </Col>
                <Col>
                    <p>
                        Improve your learning by creating flashcards to get
                        ahead of the curve.<br></br>Study smart even while on
                        the go. <br></br> Have constant access to your study
                        material, any time and anywhere.
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
