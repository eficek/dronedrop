import React from "react";
import { Link } from "react-router-dom";

export default class UserSmall extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.user;
  }
  render() {
    const user = this.state;
    return (
      <div>
        <Link to={`/users/${user.id}`} style={{ "textDecoration": "none"}} >
          <h4 >{user.name}</h4>
          <p>{user.address}</p>
        </Link>
      </div>
    );
  }
}
