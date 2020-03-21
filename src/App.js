import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { loadUser } from "./store/actions/authActions";

// Layout and Routes
import AppLayout from "./containers/Layout";
import Routes from "./routes";

// Proptypes
import PropTypes from "prop-types";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    componentDidMount() {
        // If localstorage has token, load user data
        this.props.loadUser();
    }

    render() {
        return (
            <Router>
                <AppLayout {...this.props}>
                    <Routes />
                </AppLayout>
            </Router>
        );
    }
}

App.propTypes = {
    user: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth
    };
};

export default connect(mapStateToProps, { loadUser })(App);
