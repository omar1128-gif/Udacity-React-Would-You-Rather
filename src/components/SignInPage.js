import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./SignInPage.css";
import { handleSignIn } from "../actions/shared";

class SignInPage extends Component {
    state = {
        selectedUser: "",
    };

    handleChange = (e) => {
        this.setState({
            selectedUser: e.target.value,
        });
    };

    handleOnClick = (e) => {
        e.preventDefault();

        this.props.dispatch(handleSignIn(this.state.selectedUser));

        const history = this.props.history;

        if (
            !this.props.location.state ||
            this.props.location.state.from === "/signin"
        ) {
            history.push("/");
        } else {
            history.push(this.props.location.state.from);
        }
    };

    render() {
        const { users } = this.props;

        return (
            <div className="sign-in-container">
                <div className="sign-in-container-phrases">
                    <p id="welcome-phrase">
                        Welcome to the Would You Rather App!
                    </p>
                    <p id="sign-in-phrase">Please sign in to continue</p>
                </div>

                <img
                    src="/images/react-redux-logo.png"
                    alt="react-redux-logo"
                />
                <p id="sign-in-word">Sign In</p>
                <select
                    className="select-list"
                    defaultValue=""
                    onChange={this.handleChange}
                    name="user"
                    required
                >
                    <option value="" disabled>
                        Select User
                    </option>
                    {Object.values(users).map((user) => (
                        <option value={user.id} key={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    id="sign-in-button"
                    onClick={this.handleOnClick}
                    disabled={this.state.selectedUser === ""}
                >
                    Sign In
                </button>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default withRouter(connect(mapStateToProps)(SignInPage));
