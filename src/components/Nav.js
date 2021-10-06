import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { connect } from "react-redux";
import { handleSignOut } from "../actions/shared";

class Nav extends Component {
    handleonClick = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(handleSignOut());
    };

    render() {
        const { authedUser } = this.props;

        return (
            <nav className="nav">
                <NavLink to="/" exact>
                    <img
                        src="/images/would-you-rather-logo.png"
                        alt="app-logo"
                    />
                </NavLink>

                <ul className="nav-links">
                    <li>
                        <NavLink to="/" exact activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add" activeClassName="active">
                            New Question
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/leaderboard" activeClassName="active">
                            Leader Board
                        </NavLink>
                    </li>

                    {authedUser === null && (
                        <li>
                            <NavLink to="/signin" activeClassName="active">
                                Sign in
                            </NavLink>
                        </li>
                    )}

                    {authedUser && (
                        <li>
                            <a href="/signout" onClick={this.handleonClick}>
                                Sign out
                            </a>
                        </li>
                    )}
                </ul>
                {authedUser && (
                    <div className="nav-user">
                        <div className="user-id">Hello, {authedUser.name}!</div>
                        <img
                            src={
                                authedUser.avatarURL
                                    ? authedUser.avatarURL
                                    : "/images/no-image.png"
                            }
                            alt="avatar"
                        />
                    </div>
                )}
            </nav>
        );
    }
}
function mapStateToProps({ authedUser, users }) {
    return {
        authedUser: authedUser !== null ? users[authedUser] : null,
    };
}

export default connect(mapStateToProps)(Nav);
