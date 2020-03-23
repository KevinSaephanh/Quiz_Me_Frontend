import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./containers/Home/Home";
import CreateQuiz from "./containers/CreateQuiz";
import QuizDetail from "./containers/QuizDetail";
import ErrorPage from "./containers/ErrorPage";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/quizzes/:id" component={QuizDetail} />
            <Route exact path="/create" component={CreateQuiz} />
            <Route exact path="/" component={Home} />
            <Route component={ErrorPage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
