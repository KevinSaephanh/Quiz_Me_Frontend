import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/authActions";
import "./Auth.css";

const LoginModal = props => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const { username, password } = inputs;

    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = async e => {
        // Check for filled inputs
        if (username && password) {
            const user = { username, password };
            const auth = dispatch(await login(user));

            // Check if login was successful, else render error alert
            if (auth.payload.username) props.close();
            else setError(auth.payload);
        }
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
                <Form onSubmit={handleSubmit}>
                    {error !== null ? (
                        <Alert variant="danger">{error.message}</Alert>
                    ) : null}
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            maxLength="50"
                            required
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
                            maxLength="250"
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={props.close}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
