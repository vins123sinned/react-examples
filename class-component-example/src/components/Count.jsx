import React, { Component } from "react";

class Count extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<p>There are currently {this.props.todos.length} tasks!</p>
		);
	}
}

export { Count };