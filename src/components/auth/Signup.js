import React, { Component } from "react";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";

import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";

import PropTypes from "prop-types";

const SignupModal = props => {
    return <div>HELLO</div>;
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
