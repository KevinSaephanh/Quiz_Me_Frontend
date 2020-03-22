import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";

import PropTypes from "prop-types";

const LoginModal = props => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const { username, password } = inputs;
    const [errors, setErrors] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <Modal
            show={props.show}
            onHide={props.close}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Enter username"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                    </Form.Group>
                    {errors && (
                        <Alert variant="warning">
                            Username and/or Password is incorrect!
                        </Alert>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button>Submit</Button>
                <Button onClick={props.close}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

LoginModal.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps, { login })(LoginModal);
