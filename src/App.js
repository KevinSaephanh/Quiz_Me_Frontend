import React from "react";
import { Container } from "react-bootstrap";
import Routes from "./routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
    const loadUser = () => {
        if (localStorage.token) return true;
        return false;
    };

    return (
        <Container fluid>
            <Header isAuthenticated={loadUser} />
            <div id="content">
                <Routes />
            </div>
            <Footer />
        </Container>
    );
};

export default App;
