import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Home.css";
import QuestionCard from "./QuestionCard";
import { RiEmotionSadLine } from "react-icons/ri";

class Home extends Component {
    state = {
        userSelection: "unanswered",
    };

    handleClick = (e) => {
        const { userSelection } = this.state;
        if (userSelection !== e.target.value) {
            this.setState({
                userSelection: e.target.value,
            });
        }
    };

    render() {
        const { authedUser, questions } = this.props;

        if (authedUser === null) {
            alert("Please sign in to view this page.");
            return (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: "/" },
                    }}
                />
            );
        }

        const { userSelection } = this.state;
        return (
            <div className="home-container">
                <div className="questions-nav">
                    <button
                        type="button"
                        className={[
                            "questions-toggle-btn",
                            this.state.userSelection === "unanswered"
                                ? "option-selected"
                                : "",
                        ].join(" ")}
                        value="unanswered"
                        onClick={this.handleClick}
                    >
                        Unanswered Questions
                    </button>
                    <button
                        type="button"
                        className={[
                            "questions-toggle-btn",
                            this.state.userSelection === "answered"
                                ? "option-selected"
                                : "",
                        ].join(" ")}
                        onClick={this.handleClick}
                        value="answered"
                    >
                        Answered Questions
                    </button>
                </div>

                <ul className="questions-container">
                    {questions[userSelection].length > 0 &&
                        questions[userSelection].map((question) => (
                            <li key={question.id}>
                                <QuestionCard id={question.id} />
                            </li>
                        ))}

                    {userSelection === "unanswered" &&
                        Object.values(questions.unanswered).length === 0 &&
                        Object.values(questions.answered).length > 0 && (
                            <h2 className="sorry-phrase">
                                Sorry ...Waiting for new questions{" "}
                                <RiEmotionSadLine />
                            </h2>
                        )}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ authedUser, questions, users }) {
    let answeredQuestions;
    if (authedUser) {
        answeredQuestions = Object.keys(users[authedUser].answers);
    }

    return {
        authedUser: authedUser !== null ? users[authedUser] : null,
        questions: authedUser
            ? {
                  answered: Object.values(questions)
                      .filter((question) =>
                          answeredQuestions.includes(question.id)
                      )
                      .sort((a, b) => b.timestamp - a.timestamp),

                  unanswered: Object.values(questions)
                      .filter(
                          (question) => !answeredQuestions.includes(question.id)
                      )
                      .sort((a, b) => b.timestamp - a.timestamp),
              }
            : {},
    };
}

export default connect(mapStateToProps)(Home);
