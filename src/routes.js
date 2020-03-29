import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import HomePage from "./containers/HomePage/HomePage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import CreateQuizPage from "./containers/CreateQuizPage/CreateQuizPage";
import QuizDetailPage from "./containers/QuizDetailPage/QuizDetailPage";
import ErrorPage from "./containers/ErrorPage/ErrorPage";

const Routes = () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/quizzes/:id" component={QuizDetailPage} />
        <PrivateRoute exact path="/create" component={CreateQuizPage} />
        <PrivateRoute exact path="/profile/:username" component={ProfilePage} />
        <Route exact path="/" component={HomePage} />
        <Route component={ErrorPage} />
    </Switch>
);

export default Routes;
