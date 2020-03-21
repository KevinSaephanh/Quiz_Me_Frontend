import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

import PropTypes from "prop-types";

const Header = ({ isAuthenticated, logout }) => {
    const logoutUser = () => {
        logout();
        window.location.href = "/";
    };

    const renderAuthNavs = () => {
        if (isAuthenticated) {
            return <Nav.Link onClick={logoutUser}>Logout</Nav.Link>;
        }
        return (
            <div>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
            </div>
        );
    };

    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">QuizMe</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/create_quiz">Create</Nav.Link>
                    {renderAuthNavs}
                </Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

Header.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Navbar);
