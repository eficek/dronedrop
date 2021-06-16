import React from "react";
import axios from "axios";
import { Redirect } from "react-router";

export default class UserView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }
  async componentDidMount() {
    try {
      const userId = window.location.href.split("/").slice(-1)[0];
      const res = await axios.get(`/api/users/${userId}`);
      this.setState({ user: res.data });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const user = this.state.user;
    return (
      <div className="single-user">
        <h1>{user.name}</h1>
        <p>Street address: {user.address}</p>
        <p>Email address: {user.email}</p>
        {user.id != localStorage.getItem("id") ? (
          <button style={{ paddingTop: 5 }}>Send parcel</button>
        ) : (
          <div />
        )}
        {!localStorage.getItem("id") ? <Redirect to="/" /> : <div />}
      </div>
    );
  }
}
