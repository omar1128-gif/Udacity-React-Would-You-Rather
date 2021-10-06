import React, { Component } from "react";
import "./NewQuestion.css";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
    state = {
        optionOneText: "",
        optionTwoText: "",
    };

    handleOption1Change = (e) => {
        this.setState(() => ({
            optionOneText: e.target.value,
        }));
    };

    handleOption2Change = (e) => {
        this.setState(() => ({
            optionTwoText: e.target.value,
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { optionOneText, optionTwoText } = this.state;
        const { dispatch, history } = this.props;
        dispatch(handleAddQuestion(optionOneText, optionTwoText));

        history.push("/");
    };

    render() {
        if (this.props.authedUser === null) {
            alert("Please sign in to view this page.");
            return (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: {
                            from: "/add",
                        },
                    }}
                />
            );
        }

        return (
            <div>
                <form className="new-question" onSubmit={this.handleSubmit}>
                    <h3 id="new-question-create-phrase">Create New Question</h3>
                    <div id="new-question-content">
                        <h5>Complete the question:</h5>
                        <h4>Would you rather ...</h4>
                        <input
                            placeholder="Enter Option One Text Here"
                            className="input-field"
                            value={this.state.optionOneText}
                            onChange={this.handleOption1Change}
                            required
                        />
                        <h4 className="or-word">OR</h4>
                        <input
                            placeholder="Enter Option Two Text Here"
                            className="input-field"
                            value={this.state.optionTwoText}
                            onChange={this.handleOption2Change}
                            required
                        />
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    };
}
export default withRouter(connect(mapStateToProps)(NewQuestion));
