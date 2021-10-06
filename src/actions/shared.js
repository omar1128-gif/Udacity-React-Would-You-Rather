import { showLoading, hideLoading } from "react-redux-loading-bar";
import { _getQuestions, _getUsers } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { authUser, unauthUser } from "./authedUser";
import { receiveQuestions, removeQuestions } from "./questions";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());

        return _getUsers()
            .then((users) => dispatch(receiveUsers(users)))
            .then(() => {
                dispatch(hideLoading());
            });
    };
}

export function handleSignIn(user) {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(authUser(user));
        return _getQuestions()
            .then((questions) => dispatch(receiveQuestions(questions)))
            .then(() => {
                dispatch(hideLoading());
            });
    };
}

export function handleSignOut() {
    return (dispatch) => {
        dispatch(unauthUser());
        dispatch(removeQuestions());
    };
}
