import React, { PropTypes } from "react";
import {get} from 'lodash'
import ButtonLoader from "./ButtonLoader";
import { destroyAccount } from "../../actions/destroy-account";
import { connect } from "react-redux";
import { Glyphicon } from "react-bootstrap";

class DestroyAccountButton extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    children: PropTypes.node,
    icon: PropTypes.node
  };

  static defaultProps = {
    children: <span>Destroy Account</span>,
    icon: <Glyphicon glyph="remove" />
  };

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.configure.currentEndpointKey ||
      this.props.auth.configure.defaultEndpointKey
    );
  }

  handleClick () {
    this.props.dispatch(destroyAccount(this.getEndpoint()));
  }

  render () {
    let disabled = !this.props.auth.user.isSignedIn;
    return (
      <ButtonLoader
        loading={get(this.props, 'auth.destroyAccount[this.getEndpoint()].loading')}
        icon={this.props.icon}
        disabled={disabled}
        className="destroy-account-submit"
        onClick={this.handleClick.bind(this)}
        {...this.props} />
    );
  }
}

export default connect(({auth}) => ({auth}))(DestroyAccountButton);
