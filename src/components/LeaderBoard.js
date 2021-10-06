import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import LeaderBoardItem from "./LeaderBoardItem";

class LeaderBoard extends Component {
    render() {
        const { authedUser, users } = this.props;

        if (authedUser === null) {
            alert("Please sign in to view this page.");
            return (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: "/leaderboard" },
                    }}
                />
            );
        }

        return (
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <LeaderBoardItem id={user.id} ranking={user.ranking} />
                    </li>
                ))}
            </ul>
        );
    }
}

function mapStateToProps({ authedUser, users }) {
    let rankedUsers = Object.keys(users)
        .sort((a, b) => users[b].score - users[a].score)
        .slice(0, 3);

    for (let i = 0; i < rankedUsers.length; i++) {
        rankedUsers[i] = { id: rankedUsers[i], ranking: i };
    }

    return {
        authedUser,
        users: rankedUsers,
    };
}

export default connect(mapStateToProps)(LeaderBoard);
