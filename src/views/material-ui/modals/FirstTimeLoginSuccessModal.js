import React from "react";
import { connect } from "react-redux";
import { hideFirstTimeLoginSuccessModal } from "../../../actions/ui";
import Modal from "./Modal";

class FirstTimeLoginSuccessModal extends React.Component {
  render () {
    return (
      <Modal
        {...this.props}
        containerClass="first-time-login-success-modal"
        closeAction={hideFirstTimeLoginSuccessModal}
        title={`Welcome ${this.props.auth.user.attributes && this.props.auth.user.attributes.email}!`}>
        <p>Your account has been confirmed.</p>
      </Modal>
    );
  }
}

export default connect(({auth}) => ({auth}))(FirstTimeLoginSuccessModal);
