import { showLoading, hideLoading } from "react-redux-loading-bar";
import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const REMOVE_QUESTIONS = "REMOVE_QUESTIONS";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

function addQuestion(question, author) {
    return { type: ADD_QUESTION, question, author };
}

function saveAnswer({ authedUser, qid, answer }) {
    return {
        type: SAVE_ANSWER,
        qid,
        answer,
        authedUser,
    };
}

export const removeQuestions = () => ({
    type: REMOVE_QUESTIONS,
});

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
            .then((question) => dispatch(addQuestion(question, authedUser)))
            .then(() => dispatch(hideLoading()));
    };
}

export function handleSaveQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());
        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => dispatch(saveAnswer({ authedUser, qid, answer })))
            .then(() => dispatch(hideLoading()));
    };
}
