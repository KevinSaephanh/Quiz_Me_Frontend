import React, { useState } from "react";
import {
    Form,
    Button,
    Alert,
    Tooltip,
    OverlayTrigger,
    Modal
} from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { register } from "../../store/actions/authActions";
import PropTypes from "prop-types";
import "./Auth.css";

const SignupModal = props => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState("");

    const { username, email, password, confirmPassword } = inputs;
    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = async e => {
        const password1 = password;
        const password2 = confirmPassword;
        const user = {
            username,
            email,
            password1,
            password2
        };
        const res = dispatch(await register(user));
        if (
            res.payload.username ||
            res.payload.email ||
            res.payload.password1
        ) {
            setErrors({
                username: res.payload.username,
                email: res.payload.email,
                password: res.payload.password1
            });
        } else {
            setSuccess(
                "Registration successful! Check your email to validate your account!"
            );
            setTimeout(() => {
                setSuccess("");
                props.close();
            }, 3000);
        }
    };

    const renderTooltip = (props, field) => {
        // Create message for tooltip
        let message;
        switch (field) {
            case "username":
                message = "Must be at least 3 characters and alphanumeric";
                break;
            case "email":
                message = "Cannot exceed 150 characters";
                break;
            case "password":
                message =
                    "Must be at least 8 characters, contain one uppercase letter and one number";
                break;
            case "confirmPassword":
                message = "Passwords should match";
                break;
            default:
                break;
        }

        return (
            <Tooltip id="button-tooltip" {...props}>
                <strong>{message}</strong>
            </Tooltip>
        );
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
                    Signup
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        {success !== "" ? (
                            <Alert variant="success">{success}</Alert>
                        ) : null}
                        <Form.Label>Username</Form.Label>
                        {errors !== null && errors.username ? (
                            <Alert variant="danger">{errors.username}</Alert>
                        ) : null}
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 150, hide: 400 }}
                            overlay={renderTooltip({}, "username")}
                        >
                            <Form.Control
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                maxLength="50"
                                required
                            />
                        </OverlayTrigger>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        {errors !== null && errors.email ? (
                            <Alert variant="danger">{errors.email}</Alert>
                        ) : null}
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 150, hide: 400 }}
                            overlay={renderTooltip({}, "email")}
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                maxLength="250"
                                required
                            />
                        </OverlayTrigger>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword1">
                        <Form.Label>Password</Form.Label>
                        {errors !== null && errors.password ? (
                            <Alert variant="danger">{errors.password}</Alert>
                        ) : null}
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 150, hide: 400 }}
                            overlay={renderTooltip({}, "password")}
                        >
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                maxLength="250"
                                required
                            />
                        </OverlayTrigger>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 150, hide: 400 }}
                            overlay={renderTooltip({}, "confirmPassword")}
                        >
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter password again"
                                maxLength="250"
                                required
                            />
                        </OverlayTrigger>
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

SignupModal.propTypes = {
    register: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps, { register })(SignupModal);
