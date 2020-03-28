import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { logout } from "../../store/actions/authActions";
import LoginModal from "../auth/Login";
import SignupModal from "../auth/Signup";
import "./Header.css";

const Header = props => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

    const { user } = props;
    const { username } = user.user;

    const logoutUser = () => {
        logout();
        window.location.href = "/";
    };

    const renderBrand = () => {
        if (user.isAuthenticated) return `Hello, ${username}`;
        else return "QuizMe";
    };

    return (
        <div>
            <Navbar expand="lg" bg="dark">
                <Navbar.Brand href="/">{renderBrand()}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user.isAuthenticated === true ? (
                        <Nav className="mr-auto">
                            <Nav.Link href="/create">Create</Nav.Link>
                            <Nav.Link href={"/profile/" + username}>
                                Profile
                            </Nav.Link>
                            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="mr-auto">
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
                            </Nav.Link>
                        </Nav>
                    )}
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
            <SignupModal show={showSignup} close={handleCloseSignup} />
        </div>
    );
};

export default Header;
