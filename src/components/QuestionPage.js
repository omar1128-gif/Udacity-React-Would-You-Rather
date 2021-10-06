import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import QuestionCard from "./QuestionCard";

class QuestionPage extends Component {
    render() {
        const { authedUser, question } = this.props;

        if (!authedUser) {
            alert("Please login to view this page.");
            return (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: this.props.pathname },
                    }}
                />
            );
        }

        if (!question) {
            return <Redirect to="/404" />;
        }

        return <QuestionCard id={question.id} questionPage={true} />;
    }
}

function mapStateToProps({ questions, authedUser, loading }, props) {
    const { id } = props.match.params;
    const pathname = props.location.pathname;
    console.log(questions);

    return {
        authedUser,
        question: questions[id] ? questions[id] : null,
        pathname,
        loading,
    };
}

export default connect(mapStateToProps)(QuestionPage);
