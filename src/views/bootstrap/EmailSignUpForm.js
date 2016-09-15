import React, { PropTypes } from "react";
import {get} from 'lodash'
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { emailSignUpFormUpdate, emailSignUp } from "../../actions/email-sign-up";
import { connect } from "react-redux";
import { Glyphicon } from "react-bootstrap";

class EmailSignUpForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    next: PropTypes.func,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
      passwordConfirmation: PropTypes.object,
      submit: PropTypes.object
    })
  };

  static defaultProps = {
    next: () => {},
    inputProps: {
      email: {},
      password: {},
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
    this.props.dispatch(emailSignUpFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (event) {
    event.preventDefault();
    let formData = get(this.props, 'auth.emailSignUp[this.getEndpoint()].form');
    this.props.dispatch(emailSignUp(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render () {
    let disabled = (
      this.props.auth.user.signedIn ||
      get(this.props, 'auth.emailSignUp[this.getEndpoint()].loading')
    )

    return (
      <form className='redux-auth email-sign-up-form clearfix'
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text"
               label="Email"
               placeholder="Email"
               groupClassName="email-sign-up-email"
               disabled={disabled}
               value={get(this.props, 'auth.emailSignUp[this.getEndpoint()].form.email')}
               errors={get(this.props, 'auth.emailSignUp[this.getEndpoint()].errors.email')}
               onChange={this.handleInput.bind(this, "email")}
               {...this.props.inputProps.email} />

        <Input type="password"
               label="Password"
               placeholder="Password"
               groupClassName="email-sign-up-password"
               disabled={disabled}
               value={get(this.props, 'auth.emailSignUp[this.getEndpoint()].form.password')}
               errors={get(this.props, 'auth.emailSignUp[this.getEndpoint()].errors.password')}
               onChange={this.handleInput.bind(this, "password")}
               {...this.props.inputProps.password} />

        <Input type="password"
               label="Password Confirmation"
               placeholder="Password Confirmation"
               groupClassName="email-sign-up-password-confirmation"
               disabled={disabled}
               value={get(this.props, 'auth.emailSignUp[this.getEndpoint()].form.password_confirmation')}
               errors={get(this.props, 'auth.emailSignUp[this.getEndpoint()].errors.password_confirmation')}
               onChange={this.handleInput.bind(this, "password_confirmation")}
               {...this.props.inputProps.passwordConfirmation} />


        <ButtonLoader loading={get(this.props, 'auth.emailSignUp[this.getEndpoint()].loading')}
                      type="submit"
                      className="email-sign-up-submit pull-right"
                      icon={<Glyphicon glyph="send" />}
                      disabled={disabled}
                      onClick={this.handleSubmit.bind(this)}
                      {...this.props.inputProps.submit}>
          Sign Up
        </ButtonLoader>
      </form>
    );
  }
}

export default connect(({auth}) => ({auth}))(EmailSignUpForm);
