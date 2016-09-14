import React, { PropTypes } from "react";
import {get} from 'lodash'
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { Glyphicon } from "react-bootstrap";
import { updatePassword, updatePasswordFormUpdate } from "../../actions/update-password";
import { connect } from "react-redux";

class UpdatePasswordForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      password: PropTypes.object,
      passwordConfirmation: PropTypes.object
    })
  };

  static defaultProps = {
    inputProps: {
      password: {},
      passwordConfirmation: {}
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

  handleSubmit (event) {
    event.preventDefault();
    let formData = this.props.auth.updatePassword[this.getEndpoint()].form;
    this.props.dispatch(updatePassword(formData, this.getEndpoint()));
  }

  render () {
    let endpoint = this.getEndpoint();
    let loading = get(this.props, 'auth.updatePassword[endpoint].loading');
    let disabled = (
      !this.props.auth.user.isSignedIn || loading ||
      (this.props.auth.user.attributes && this.props.auth.user.attributes.provider !== "email")
    );

    return (
      <form className="redux-auth update-password-form clearfix"
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="password"
               label="Password"
               placeholder="Password"
               disabled={disabled}
               groupClassName="update-password-password"
               value={get(this.props, 'auth.updatePassword[endpoint].form.password')}
               errors={get(this.props, 'auth.updatePassword[endpoint].errors.password')}
               onChange={this.handleInput.bind(this, "password")}
               {...this.props.inputProps.password} />

        <Input type="password"
               label="Password Confirmation"
               placeholder="Password Confirmation"
               disabled={disabled}
               groupClassName="update-password-password-confirmation"
               value={get(this.props, 'auth.updatePassword[endpoint].form.password_confirmation')}
               errors={get(this.props, 'auth.updatePassword[endpoint].errors.password_confirmation')}
               onChange={this.handleInput.bind(this, "password_confirmation")}
               {...this.props.inputProps.passwordConfirmation} />

        <ButtonLoader loading={loading}
                      type="submit"
                      disabled={disabled}
                      className="pull-right update-password-submit"
                      icon={this.props.icon || <Glyphicon glyph="lock" />}
                      onClick={this.handleSubmit.bind(this)}
                      {...this.props.inputProps.submit}>
          Update Password
        </ButtonLoader>
      </form>
    );
  }
}

export default connect(({auth}) => ({auth}))(UpdatePasswordForm);
