import React, { Component } from "react";
import { connect } from "react-redux";
import "./LeaderBoardItem.css";
import { AiOutlineTrophy } from "react-icons/ai";

const rankingClass = ["first", "second", "third"];

class LeaderBoardItem extends Component {
    render() {
        const { user, ranking } = this.props;

        return (
            <div className="ranking-container">
                <AiOutlineTrophy
                    className={["trophy-icon", rankingClass[ranking]].join(" ")}
                />
                <div className="user-avatar">
                    <img
                        src={
                            user.avatarURL
                                ? user.avatarURL
                                : "/images/no-image.png"
                        }
                        alt={`${user.name}'s avatar`}
                    />
                </div>
                <div className="user-details">
                    <h3>{user.name}</h3>
                    <div className="user-statistics">
                        <p>Answered Questions</p>
                        <p>{Object.keys(user.answers).length}</p>
                    </div>
                    <hr />
                    <div className="user-statistics">
                        <p>Created Questions</p>
                        <p>{user.questions.length}</p>
                    </div>
                </div>
                <div className="user-score">
                    <div className="score-word">Score</div>
                    <div className="num-score-container">
                        <div className="score">{user.score}</div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }, { id, ranking }) {
    return {
        user: users[id],
        ranking,
    };
}

export default connect(mapStateToProps)(LeaderBoardItem);
