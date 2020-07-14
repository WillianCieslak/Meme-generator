import React, { Component } from "react";

export default class Export extends Component {
    render() {
        const { capture } = this.props;
        return (
            <button onClick={capture}>Export Image</button>
        );
    }
}
