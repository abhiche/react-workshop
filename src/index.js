import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const response = await axios.get("https://api.github.com/users");

    this.setState({
      users: response.data
    });
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return (
            <div key={user.id}>
              <div>{user.login}</div>
              <img src={user.avatar_url} alt={user.login} />
            </div>
          );
        })}
      </div>
    );
  }
}

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios
      // .get("https://api.github.com/users/" + this.props.match.params.id)
      .get("https://api.github.com/users/" + this.props.id)
      .then(({ data }) => {
        this.setState({
          user: data,
          isLoading: false
        });
        console.log(data);
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <div>
        <div>
          <div>{this.state.user.login}</div>
          <img src={this.state.user.avatar_url} alt={this.state.user.login} />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<UserList name="Kerwin" />, document.getElementById("root"));
ReactDOM.render(<UserDetails id="mojombo" />, document.getElementById("root"));
