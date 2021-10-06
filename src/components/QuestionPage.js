import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import QuestionCard from "./QuestionCard";

class QuestionPage extends Component {
    render() {
        const { authedUser, question } = this.props;

        if (authedUser === null) {
            alert("Please login to view this page.");
            return <Redirect to="/" />;
        }

        if (question === null) {
            return <Redirect to="/404" />;
        }

        return <QuestionCard id={question.id} questionPage={true} />;
    }
}

function mapStateToProps({ questions, authedUser }, props) {
    const { id } = props.match.params;

    return {
        authedUser,
        question: questions[id] ? questions[id] : null,
    };
}

export default connect(mapStateToProps)(QuestionPage);
