import React, { Component } from "react";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";

import { connect } from "react-redux";
import { register } from "../store/actions/authActions";

import PropTypes from "prop-types";

class Register extends Component {
    state = {
        username: "",
        email: "",
        password1: "",
        password2: "",
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

        const { username, email, password1, password2 } = this.state;
        const newUser = {
            username,
            email,
            password1,
            password2,
            is_verified: true
        };

        this.props.register(newUser);
    };

    render() {
        const { errors } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        return (
            <div>
                <h1>Signup</h1>
                <Form onSubmit={this.onSubmit} {...formItemLayout}>
                    {errors.username && (
                        <Alert message={errors.username} type="error" />
                    )}
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your username"
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

                    {errors.email && (
                        <Alert message={errors.email} type="error" />
                    )}
                    <Form.Item>
                        {getFieldDecorator("email", {
                            rules: [
                                {
                                    type: "email",
                                    required: true,
                                    message: "Please input your email"
                                }
                            ]
                        })(
                            <InputGroup
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={this.onChange}
                            />
                        )}
                    </Form.Item>

                    {errors.password1 && (
                        <Alert message={errors.password1} type="error" />
                    )}
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your password"
                                }
                            ]
                        })(
                            <InputGroup
                                type="password"
                                name="password1"
                                placeholder="Enter password"
                                onChange={this.onChange}
                            />
                        )}
                    </Form.Item>

                    {errors.non_field_errors && (
                        <Alert message={errors.non_field_errors} type="error" />
                    )}
                    <Form.Item hasFeedback>
                        {getFieldDecorator("confirm", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please confirm your password"
                                }
                            ]
                        })(
                            <InputGroup
                                type="password"
                                name="password2"
                                placeholder="Confirm password"
                                onChange={this.onChange}
                            />
                        )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps, { register })(Register);
