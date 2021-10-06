import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./QuestionCard.css";
import { handleSaveQuestionAnswer } from "../actions/questions";

class QuestionCard extends Component {
    state = {
        selected: "optionOne",
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, question } = this.props;
        dispatch(handleSaveQuestionAnswer(question.id, this.state.selected));
    };

    handleClick = (e) => {
        this.setState({
            selected: e.target.value,
        });
    };

    render() {
        const { question, author, questionPage, authedUser } = this.props;
        const isAnswered = Object.keys(authedUser.answers).includes(
            question.id
        );

        let totalVotes;
        let optionOneVotes;
        let optionTwoVotes;
        let authedUserAnswer;

        if (isAnswered) {
            optionOneVotes = question.optionOne.votes.length;
            optionTwoVotes = question.optionTwo.votes.length;
            totalVotes = optionOneVotes + optionTwoVotes;
            authedUserAnswer = authedUser.answers[question.id];
        }

        return (
            <div className="question-container">
                <p className="question-author-name">{author.name} asks:</p>
                <div className="question-area">
                    <div className="question-author-avatar">
                        <img
                            src={
                                author.avatarURL
                                    ? author.avatarURL
                                    : "/images/no-image.png"
                            }
                            alt={`${author.name} avatar`}
                        />
                    </div>

                    <div className="question-brief-details">
                        {/* view in home */}
                        {!questionPage && (
                            <div>
                                <h3>Would You Rather...</h3>
                                <p>{question.optionOne.text}...Or ~</p>
                                <Link
                                    to={`/questions/${question.id}`}
                                    className="view-poll"
                                >
                                    View Poll
                                </Link>
                            </div>
                        )}

                        {/* view in questions/:id if it is answered */}
                        {questionPage && isAnswered && (
                            <div>
                                <h3>Results:</h3>
                                <div
                                    className={[
                                        "vote-container",
                                        authedUserAnswer === "optionOne"
                                            ? "selected-answer"
                                            : "",
                                    ].join(" ")}
                                >
                                    <p>{question.optionOne.text}?</p>
                                    <p className="percent">
                                        {(
                                            (optionOneVotes / totalVotes) *
                                            100
                                        ).toPrecision(3)}
                                        <span>%</span>
                                    </p>
                                    <p className="votes-number">
                                        {`${optionOneVotes}`} out of{" "}
                                        {`${totalVotes}`} votes
                                    </p>
                                    {authedUserAnswer === "optionOne" && (
                                        <div className="user-vote">
                                            Your vote
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={[
                                        "vote-container",
                                        authedUserAnswer === "optionTwo"
                                            ? "selected-answer"
                                            : "",
                                    ].join(" ")}
                                >
                                    <p>{question.optionTwo.text}?</p>
                                    <p className="percent">
                                        {(
                                            (optionTwoVotes / totalVotes) *
                                            100
                                        ).toPrecision(3)}
                                        <span>%</span>
                                    </p>
                                    <p className="votes-number">
                                        {`${optionTwoVotes}`} out of{" "}
                                        {`${totalVotes}`} votes
                                    </p>
                                    {authedUserAnswer === "optionTwo" && (
                                        <div className="user-vote">
                                            Your vote
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* view in /questions/:id if unanswered */}
                        {questionPage && !isAnswered && (
                            <div>
                                <h3>Would You Rather...</h3>
                                <form
                                    className="question-vote-form"
                                    onSubmit={this.handleSubmit}
                                >
                                    <div className="option-container">
                                        <input
                                            type="radio"
                                            id="optionOne"
                                            value="optionOne"
                                            name="option"
                                            onClick={this.handleClick}
                                            defaultChecked
                                        />
                                        <label htmlFor="optionOne">
                                            {question.optionOne.text}
                                        </label>
                                    </div>

                                    <div className="option-container">
                                        <input
                                            type="radio"
                                            id="optionTwo"
                                            value="optionTwo"
                                            name="option"
                                            onClick={this.handleClick}
                                        />
                                        <label htmlFor="optionTwo">
                                            {question.optionTwo.text}
                                        </label>
                                    </div>

                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ questions, users, authedUser }, { id, pollPage }) {
    const question = questions[id];

    const author = users[question.author];

    return {
        question,
        author,
        authedUser: authedUser ? users[authedUser] : null,
        pollPage,
    };
}

export default connect(mapStateToProps)(QuestionCard);
