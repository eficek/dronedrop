import React from "react";

export default class FormField extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.name}</label>
        <input
          type={this.props.type}
          placeholder={this.props.placeholder}
          field={this.props.field}
          onChange={this.props.change}
        />
      </div>
    );
  }
}
