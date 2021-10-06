import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
    return (
        <div className="loading">
            <ReactLoading color="#1dd3bd" width="100px" type="spin" />
        </div>
    );
}
