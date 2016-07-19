import React, { PropTypes } from "react";
import ButtonLoader from "./ButtonLoader";
import { Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import { signOut } from "../../actions/sign-out";

class SignOutButton extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node
  };

  static defaultProps = {
    children: <span>Sign Out</span>,
    icon: <Glyphicon glyph="log-out" />
  };

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.configure.currentEndpointKey ||
      this.props.auth.configure.defaultEndpointKey
    );
  }

  handleClick () {
    this.props.dispatch(signOut(this.getEndpoint()));
  }

  render () {
    let disabled = !this.props.auth.user.isSignedIn;
    return (
      <ButtonLoader
        loading={this.props.auth.signOut[this.getEndpoint()].loading}
        icon={this.props.icon}
        disabled={disabled}
        className="sign-out-submit"
        onClick={this.handleClick.bind(this)}
        {...this.props} />
    );
  }
}

export default connect(({auth}) => ({auth}))(SignOutButton);
