import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./store/actions/authActions";
import Routes from "./routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        async function getUser() {
            dispatch(loadUser);
        }

        getUser();
    }, []);

    return (
        <Container fluid>
            <Header user={user} />
            <div id="content">
                <Routes user={user} />
            </div>
            <Footer />
        </Container>
    );
};

export default App;
