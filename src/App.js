import React from "react";
import { Container } from "react-bootstrap";
import Routes from "./routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
    return (
        <Container fluid>
            <Header />
            <Routes />
            <Footer />
        </Container>
    );
};

export default App;
