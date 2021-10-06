import { ADD_QUESTION, SAVE_ANSWER } from "../actions/questions";
import { RECEIVE_USERS } from "../actions/users";

function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            const users = {
                ...action.users,
            };

            for (let id in action.users) {
                const askedQuestions = action.users[id].questions.length;
                const answeredQuestions = Object.keys(
                    action.users[id].answers
                ).length;
                users[id] = { ...users[id] };
                users[id].score = askedQuestions + answeredQuestions;
            }

            return users;

        case ADD_QUESTION:
            const { author, question } = action;
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([question.id]),
                    score: state[author].score + 1,
                },
            };
        case SAVE_ANSWER:
            const { qid, answer, authedUser } = action;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer,
                    },
                    score: state[authedUser].score + 1,
                },
            };

        default:
            return state;
    }
}

export default users;
