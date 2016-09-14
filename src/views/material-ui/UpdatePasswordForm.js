import React, { PropTypes } from "react";
import {get} from 'lodash'
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import ActionLock from "material-ui/svg-icons/action/lock";
import { updatePassword, updatePasswordFormUpdate } from "../../actions/update-password";
import { connect } from "react-redux";

class UpdatePasswordForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      password: PropTypes.object,
      passwordConfirmation: PropTypes.object,
      submit: PropTypes.object
    })
  };

  static defaultProps = {
    inputProps: {
      password: {},
      passwordConfirmation: {},
      submit: {}
    }
  };

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.configure.currentEndpointKey ||
      this.props.auth.configure.defaultEndpointKey
    );
  }

  handleInput (key, val) {
    this.props.dispatch(updatePasswordFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (ev) {
    ev.preventDefault();
    let formData = this.props.auth.updatePassword[this.getEndpoint()].form;
    this.props.dispatch(updatePassword(formData, this.getEndpoint()));
  }

  render () {
    let endpoint = this.getEndpoint();
    let loading = get('this.props.auth.updatePassword[endpoint].loading');
    let disabled = (
      !this.props.auth.user.isSignedIn || loading ||
      (this.props.auth.user.attributes && this.props.auth.user.attributes.provider !== "email")
    );

    return (
      <form
        className="redux-auth update-password-form clearfix"
        onSubmit={this.handleSubmit.bind(this)}>
        <Input
          type="password"
          floatingLabelText="Password"
          disabled={disabled}
          className="update-password-password"
          value={get('this.props.auth.updatePassword[endpoint].form.password')}
          errors={get('this.props.auth.updatePassword[endpoint].errors.password')}
          onChange={this.handleInput.bind(this, "password")}
          {...this.props.inputProps.password} />

        <Input
          type="password"
          floatingLabelText="Password Confirmation"
          className="update-password-password-confirmation"
          disabled={disabled}
          value={get('this.props.auth.updatePassword[endpoint].form.password_confirmation')}
          errors={get('this.props.auth.updatePassword[endpoint].errors.password_confirmation')}
          onChange={this.handleInput.bind(this, "password_confirmation")}
          {...this.props.inputProps.passwordConfirmation} />

        <ButtonLoader
          loading={loading}
          type="submit"
          className="update-password-submit"
          icon={ActionLock}
          primary={true}
          disabled={disabled}
          style={{float: "right"}}
          onClick={this.handleSubmit.bind(this)}
          {...this.props.inputProps.submit}>
          Update Password
        </ButtonLoader>
      </form>
    );
  }
}

export default connect(({auth}) => ({auth}))(UpdatePasswordForm);
