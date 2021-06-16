import React from "react";
import axios from "axios";
import FormField from "./FormField";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.attributes.field.value]: e.target.value });
  }

  async handleSubmit() {
    axios
      .post(`api/users/login`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.id != null) {
          localStorage.setItem("id", res.data.id);
          window.location.href = "/users";
        } else
          this.setState({
            errors: { login: "Login failed, please try again" },
          });
      });
  }

  render() {
    return (
      <div className="form">
        <div className="form-header">Login</div>
        <FormField
          name="Email Address:"
          type="text"
          field="email"
          placeholder="user@mail.com"
          change={this.handleChange}
        />
        <FormField
          name="Password:"
          type="password"
          field="password"
          placeholder="Password"
          change={this.handleChange}
        />
        <span className="form-error">{this.state.errors["login"]}</span>
        <button type="button" onClick={this.handleSubmit}>
          Login
        </button>
        <Link to="/signup" className="form-link">
          Register a new account
        </Link>
        {localStorage.getItem("id") ? <Redirect to="/users" /> : <div />}
      </div>
    );
  }
}
