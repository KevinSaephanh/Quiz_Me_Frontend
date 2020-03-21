import React from "react";
import { Route, Switch } from "react-router-dom";

// HOC
import Hoc from "./hoc/hoc";

// Models
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import CreateQuiz from "./containers/CreateQuiz";
import QuizDetail from "./containers/QuizDetail";
import ErrorPage from "./containers/ErrorPage";

const Routes = () => (
    <Hoc>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/quizzes/:id" component={QuizDetail} />
            <Route exact path="/create_quiz" component={CreateQuiz} />
            <Route exact path="/" component={Home} />
            <Route component={ErrorPage} />
        </Switch>
    </Hoc>
);

export default Routes;
