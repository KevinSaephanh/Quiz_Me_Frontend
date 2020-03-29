import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./containers/Home/Home";
import Profile from "./containers/profile/Profile";
import CreateQuiz from "./containers/CreateQuiz";
import QuizDetail from "./containers/QuizDetail";
import ErrorPage from "./containers/ErrorPage";

const Routes = () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/quizzes/:id" component={QuizDetail} />
        <PrivateRoute exact path="/create" component={CreateQuiz} />
        <PrivateRoute exact path="/profile/:username" component={Profile} />
        <Route exact path="/" component={Home} />
        <Route component={ErrorPage} />
    </Switch>
);

export default Routes;
