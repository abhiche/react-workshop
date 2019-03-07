import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

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
              <Link to={`/users/${user.login}`}>{user.login}</Link>
              <img src={user.avatar_url} alt={user.login} />
            </div>
          );
        })}
      </div>
    );
  }

  componentWillUnmount() {
    console.log("Destroy");
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
    console.log(this.props.match.params.id);
    axios
      .get("https://api.github.com/users/" + this.props.match.params.id)
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

const route = (
  <Router>
    <Switch>
      <Route exact path="/users" component={UserList} />
      <Route path="/users/:id" component={UserDetails} />
    </Switch>
  </Router>
);

ReactDOM.render(route, document.getElementById("root"));
