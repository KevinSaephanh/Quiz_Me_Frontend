import React, { Component } from "react";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../store/actions/authActions";

import PropTypes from "prop-types";

class Login extends Component {
    state = {
        username: "",
        password: "",
        errors: {}
    };

    componentDidUpdate(prevProps) {
        // If user is logged in already, redirect to home page
        if (this.props.user.isAuthenticated) {
            this.props.history.push("/");
        }

        // Set new errors if different from previous errors
        const { errors } = this.props.user;
        if (errors !== prevProps.user.errors) {
            this.setState({
                errors
            });
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.login(userData);
    };

    render() {
        const { errors } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <h1>Login</h1>
                {errors.msg && <Alert message={errors.msg} type="error" />}
                <Form onSubmit={this.onSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please InputGroup your username"
                                }
                            ]
                        })(
                            <InputGroup
                                name="username"
                                placeholder="Enter username"
                                onChange={this.onChange}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please InputGroup your password"
                                }
                            ]
                        })(
                            <InputGroup
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={this.onChange}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={this.onSubmit}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps, { login })(Login);
