import React from "react";
import { connect } from "react-redux";

class TokenBridge extends React.Component {
  render () {
    return (
      <script id="token-bridge"
              type="application/json"
              dangerouslySetInnerHTML={{__html: this.props.initialCredentials}} />
    );
  }
}

export default connect(({auth}) => {
  let headers = auth.server.headers;

  return {
    initialCredentials: headers && JSON.stringify({
      user: auth.server.user,
      mustResetPassword: auth.server.mustResetPassword,
      firstTimeLogin: auth.server.firstTimeLogin,
      currentEndpointKey: auth.configure.currentEndpointKey,
      defaultEndpointKey: auth.configure.defaultEndpointKey,
      headers
    })
  };
})(TokenBridge);
