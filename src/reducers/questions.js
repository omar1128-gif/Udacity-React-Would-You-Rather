import {
    ADD_QUESTION,
    SAVE_ANSWER,
    RECEIVE_QUESTIONS,
    REMOVE_QUESTIONS,
} from "../actions/questions";

function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return action.questions;

        case ADD_QUESTION:
            const { question } = action;
            return {
                ...state,
                [question.id]: question,
            };

        case SAVE_ANSWER:
            const { qid, answer, authedUser } = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser]),
                    },
                },
            };

        case REMOVE_QUESTIONS:
            return {};
        default:
            return state;
    }
}

export default questions;
