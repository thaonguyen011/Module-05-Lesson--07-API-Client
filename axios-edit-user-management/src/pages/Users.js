import axios from "axios";
import React, { Component } from "react";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(" http://localhost:3001/api/users")
      .then((res) => {
        this.setState({users: res.data});
      })
      .catch((err) => {
        throw err;
      });
  }

  handleCreate() {
    window.location.href = "user/add"
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Users List</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <a href={`/user/${user.id}`}>{user.name}</a>
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.handleCreate}>Create</button>
      </div>
    );
  }
}
