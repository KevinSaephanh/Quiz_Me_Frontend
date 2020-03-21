import React from "react";
import { Table, Col } from "react-bootstrap";

const QuestionList = ({ questions }) => {
    return (
        <Table dataSource={questions}>
            <Col title="Question" dataIndex="question" key="question" />
            <Col title="Answer" dataIndex="answer" key="answer" />
        </Table>
    );
};

export default QuestionList;
