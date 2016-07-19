import React, { PropTypes } from "react";
import { Modal, Button, Glyphicon } from "react-bootstrap";
import ButtonLoader from "../ButtonLoader";
import Input from "../Input";
import { connect } from "react-redux";
import { hidePasswordResetSuccessModal } from "../../../actions/ui";
import {
  updatePasswordModal,
  updatePasswordModalFormUpdate
} from "../../../actions/update-password-modal";

class PasswordResetSuccessModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    inputProps: PropTypes.object
  };

  static defaultProps = {
    show: false,
    inputProps: {}
  };

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.configure.currentEndpointKey ||
      this.props.auth.configure.defaultEndpointKey
    );
  }

  handleInput (key, val) {
    this.props.dispatch(updatePasswordModalFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit () {
    let formData = this.props.auth.updatePasswordModal[this.getEndpoint()].form;
    this.props.dispatch(updatePasswordModal(formData, this.getEndpoint()));
  }

  close () {
    this.props.dispatch(hidePasswordResetSuccessModal(this.getEndpoint()));
  }

  render () {
    const endpoint = this.getEndpoint();
    const modal = this.props.auth.updatePasswordModal[endpoint]
    if (!modal) {return <Modal/>}
    let loading = modal && modal.loading;

    return (
      <Modal
        show={this.props.show}
        className="password-reset-success-modal"
        onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Your Password</Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              disabled={loading}
              className="password-reset-success-modal-password"
              value={modal.form.password}
              errors={modal.errors.password}
              onChange={this.handleInput.bind(this, "password")}
              {...this.props.inputProps.password} />

            <Input
              type="password"
              label="Password Confirmation"
              placeholder="Password Confirmation"
              disabled={loading}
              className="password-reset-success-modal-password-confirmation"
              value={modal.form.password_confirmation}
              errors={modal.errors.password_confirmation}
              onChange={this.handleInput.bind(this, "password_confirmation")}
              {...this.props.inputProps.passwordConfirmation} />
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="password-reset-success-modal-close"
              onClick={this.close.bind(this)}
              {...this.props.inputProps.cancel}>
              Cancel
            </Button>

            <ButtonLoader
              {...this.props}
              loading={loading}
              type="submit"
              className="password-reset-success-modal-submit"
              icon={<Glyphicon glyph="lock" />}
              onClick={this.handleSubmit.bind(this)}
              {...this.props.inputProps.submit} />
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default connect(({auth}) => ({auth}))(PasswordResetSuccessModal);
