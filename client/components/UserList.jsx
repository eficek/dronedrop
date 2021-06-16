import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import UserSmall from "./UserSmall";

export default class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get("/api/users");
      this.setState({ users: res.data });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <div className="user-container">
        {this.state.users.map((user) => (
          <div className="user-small" key={user.id}>
            <UserSmall user={user} />
          </div>
        ))}
        {!localStorage.getItem("id") ? <Redirect to="/" /> : <div />}
      </div>
    );
  }
}
