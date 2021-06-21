import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import FormField from "./FormField";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      address: "",
      city: "",
      state: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.attributes.field.value]: e.target.value });
  }

  handleValidation() {
    let formIsValid = true;
    let errors = {};

    for (const key in this.state) {
      if (!this.state[key]) {
        formIsValid = false;
        errors[key] = "This field cannot be empty";
      }
    }

    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(this.state.email)) {
      errors["email"] = "Invalid email address";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  async handleSubmit(e) {
    const AUTH_ID = null;
    const AUTH_TOKEN = null;
    if (this.handleValidation()) {
      fetch(
        `https://us-street.api.smartystreets.com/street-address?auth-id=${AUTH_ID}&auth-token=${AUTH_TOKEN}&street=${this.state.address}&city=${this.state.city}&state=${this.state.state}&candidates=10`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            alert("Unable to validate address.");
          } else {
            axios
              .post(`/api/users/signup`, {
                name: this.state.username,
                email: this.state.email,
                password: this.state.password,
                address: `${data[0].delivery_line_1}, ${data[0].last_line}`,
              })
              .then((res) => {
                localStorage.setItem("id", res.data.id);
                window.location.href = "/users";
              });
          }
        });
    }
  }

  render() {
    return (
      <div className="form">
        <div className="form-header">Sign Up</div>
        <FormField
          name="Email Address:"
          type="text"
          field="email"
          placeholder="user@mail.com"
          change={this.handleChange}
        />
        <span className="form-error">{this.state.errors["email"]}</span>
        <FormField
          name="Username:"
          type="text"
          field="username"
          placeholder="Username"
          change={this.handleChange}
        />
        <span className="form-error">{this.state.errors["username"]}</span>
        <FormField
          name="Password:"
          type="password"
          field="password"
          placeholder="Password"
          change={this.handleChange}
        />
        <span className="form-error">{this.state.errors["password"]}</span>
        <FormField
          name="Street Address:"
          type="text"
          placeholder="123 Sesame St"
          field="address"
          change={this.handleChange}
        />
        <span className="form-error">{this.state.errors["address"]}</span>
        <FormField
          name="City:"
          type="text"
          field="city"
          placeholder="New York"
          change={this.handleChange}
        />
        <span className="form-error">{this.state.errors["city"]}</span>
        <FormField
          name="State:"
          type="text"
          field="state"
          placeholder="NY"
          change={this.handleChange}
        />
        <span className="form-error">{this.state.errors["state"]}</span>
        <button type="button" onClick={this.handleSubmit}>
          Verify + Register
        </button>
        <Link to="/" className="form-link">
          Already have an account? Log in
        </Link>
        {localStorage.getItem("id") ? <Redirect to="/users" /> : <div />}
      </div>
    );
  }
}
