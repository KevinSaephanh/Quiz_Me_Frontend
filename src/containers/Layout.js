import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";
import Navbar from "../components/Header/Header";
import Footer from "../components/Footer";
import { Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

class AppLayout extends Component {
    render() {
        const { user } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Navbar isAuthenticated={user.isAuthenticated} />
                </Row>
                <Row>{this.props.children}</Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        );
    }
}

AppLayout.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default withRouter(connect(mapStateToProps, { logout })(AppLayout));
