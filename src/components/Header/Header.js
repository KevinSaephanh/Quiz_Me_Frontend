import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import LoginModal from "../auth/Login";
import SignupModal from "../auth/Signup";
import PropTypes from "prop-types";
import "./Header.css";

const Header = props => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

    const logoutUser = () => {
        logout();
        props.history.push("/");
    };

    const renderAuthNavs = () => {
        if (props.isAuthenticated) {
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
        <div>
            <Navbar expand="lg" bg="dark">
                <Navbar.Brand href="/">QuizMe</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/create">Create</Nav.Link>
                        <Nav.Link
                            href="#"
                            name="loginModal"
                            onClick={handleShowLogin}
                        >
                            Login
                        </Nav.Link>
                        <Nav.Link
                            href="#"
                            name="signupModal"
                            onClick={handleShowSignup}
                        >
                            Signup
                        </Nav.Link>{" "}
                    </Nav>
                    <Form inline className="search-form">
                        <FormControl
                            type="text"
                            placeholder="Search for a quiz"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <LoginModal show={showLogin} close={handleCloseLogin} />
            <SignupModal
                modalOpen={showSignup}
                handleModalOpen={handleCloseSignup}
            />
        </div>
    );
};

Header.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Header);
