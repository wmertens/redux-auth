import React from "react";
import { connect } from "react-redux";
import { hideOAuthSignInSuccessModal } from "../../../actions/ui";
import Modal from "./Modal";

class OAuthSignInSuccessModal extends React.Component {
  render () {
    return (
      <Modal
        {...this.props}
        containerClass="oauth-sign-in-success-modal"
        title="Welcome"
        closeAction={hideOAuthSignInSuccessModal}>
        <p>You are now signed in via {this.props.auth.user.attributes && this.props.auth.user.attributes.provider}.</p>
      </Modal>
    );
  }
}

export default connect(({auth}) => ({auth}))(OAuthSignInSuccessModal);
