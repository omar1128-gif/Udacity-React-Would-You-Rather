import { showLoading, hideLoading } from "react-redux-loading-bar";
import { _getQuestions, _getUsers } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { authUser, unauthUser } from "./authedUser";
import { receiveQuestions, removeQuestions } from "./questions";
import { setLoading } from "./loading";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(setLoading(true));
        dispatch(showLoading());

        return _getUsers()
            .then((users) => dispatch(receiveUsers(users)))
            .then(() => {
                dispatch(hideLoading());
                dispatch(setLoading(false));
            });
    };
}

export function handleSignIn(user) {
    return (dispatch) => {
        dispatch(setLoading(true));
        dispatch(showLoading());
        dispatch(authUser(user));
        return _getQuestions()
            .then((questions) => dispatch(receiveQuestions(questions)))
            .then(() => {
                dispatch(hideLoading());
                dispatch(setLoading(false));
            });
    };
}

export function handleSignOut() {
    return (dispatch) => {
        dispatch(unauthUser());
        dispatch(removeQuestions());
    };
}
