import React, { PropTypes } from "react";
import {get} from 'lodash'
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { connect } from "react-redux";
import {
  requestPasswordResetFormUpdate,
  requestPasswordReset
} from "../../actions/request-password-reset";

class RequestPasswordResetForm extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      submit: PropTypes.object
    })
  };

  static defaultProps = {
    inputProps: {
      email: {},
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
    this.props.dispatch(requestPasswordResetFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (event) {
    event.preventDefault();
    let formData = this.props.auth.requestPasswordReset[this.getEndpoint()].form;
    this.props.dispatch(requestPasswordReset(formData, this.getEndpoint()));
  }

  render () {
    let endpoint       = this.getEndpoint();
    let loading        = get(this.props, 'auth.requestPasswordReset[endpoint].loading');
    let inputDisabled  = this.props.auth.user.isSignedIn;
    let submitDisabled = !get(this.props, 'auth.requestPasswordReset[endpoint].form.email');

    return (
      <form
        className='redux-auth request-password-reset-form clearfix'
        style={{clear: "both", overflow: "hidden"}}
        onSubmit={this.handleSubmit.bind(this)}>

        <Input
          type="text"
          label="Email Address"
          placeholder="Email Address"
          className="request-password-reset-email"
          disabled={loading || inputDisabled}
          value={get(this.props, 'auth.requestPasswordReset[endpoint].form.email')}
          errors={get(this.props, 'auth.requestPasswordReset[endpoint].errors.email')}
          onChange={this.handleInput.bind(this, "email")}
          {...this.props.inputProps.email} />

        <ButtonLoader
          loading={loading}
          type="submit"
          primary={true}
          style={{float: "right"}}
          className="request-password-reset-submit"
          disabled={inputDisabled || submitDisabled}
          onClick={this.handleSubmit.bind(this)}
          {...this.props.inputProps.submit}>
          Request Password Reset
        </ButtonLoader>
      </form>
    );
  }
}

export default connect(({auth}) => ({auth}))(RequestPasswordResetForm);
