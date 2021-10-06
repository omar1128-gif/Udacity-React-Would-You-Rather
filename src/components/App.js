import React, { Component } from "react";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import { Fragment } from "react";
import LoadingBar from "react-redux-loading-bar";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import SignInPage from "./SignInPage";
import QuestionPage from "./QuestionPage";
import LeaderBoard from "./LeaderBoard";
import Page404 from "./Page404";
import Loading from "./Loading";

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <Nav />
                    <main>
                        {this.props.loading ? (
                            <Loading />
                        ) : (
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route
                                    path="/questions/:id"
                                    exact
                                    component={QuestionPage}
                                />

                                <Route
                                    path="/add"
                                    exact
                                    component={NewQuestion}
                                />
                                <Route
                                    path="/leaderboard"
                                    exact
                                    component={LeaderBoard}
                                />
                                <Route
                                    path="/signin"
                                    exact
                                    component={SignInPage}
                                />
                                <Route
                                    path="/signout"
                                    exact
                                    render={() => <Redirect to="/signin" />}
                                />
                                <Route path="/404" component={Page404} />

                                <Route path="*">
                                    <Redirect to="/404" />
                                </Route>
                            </Switch>
                        )}
                    </main>
                </Fragment>
            </Router>
        );
    }
}

export default connect(({ loading }) => ({ loading }))(App);
