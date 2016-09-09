import React, { PropTypes } from "react";
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { emailSignUpFormUpdate, emailSignUp } from "../../actions/email-sign-up";
import { connect } from "react-redux";
import { Glyphicon } from "react-bootstrap";

class EmailSignUpForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
      passwordConfirmation: PropTypes.object,
      submit: PropTypes.object
    })
  };

  static defaultProps = {
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
    let formData = this.props.auth.emailSignUp[this.getEndpoint()].form;
    this.props.dispatch(emailSignUp(formData, this.getEndpoint()));
  }

  render () {
    const {auth: {user, emailSignUp}, inputProps} = this.props
    const formData = emailSignUp[this.getEndpoint()]
    if (!formData) {
      return <form className='redux-auth email-sign-up-form clearfix'/>
    }
    let disabled = (user.isSignedIn || formData.loading);

    return (
      <form className='redux-auth email-sign-up-form clearfix'
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text"
               label="Email"
               placeholder="Email"
               groupClassName="email-sign-up-email"
               disabled={disabled}
               value={formData.form.email}
               errors={formData.errors.email}
               onChange={this.handleInput.bind(this, "email")}
               {...inputProps.email} />

        <Input type="password"
               label="Password"
               placeholder="Password"
               groupClassName="email-sign-up-password"
               disabled={disabled}
               value={formData.form.password}
               errors={formData.errors.password}
               onChange={this.handleInput.bind(this, "password")}
               {...inputProps.password} />

        <Input type="password"
               label="Password Confirmation"
               placeholder="Password Confirmation"
               groupClassName="email-sign-up-password-confirmation"
               disabled={disabled}
               value={formData.form.password_confirmation}
               errors={formData.errors.password_confirmation}
               onChange={this.handleInput.bind(this, "password_confirmation")}
               {...inputProps.passwordConfirmation} />


        <ButtonLoader loading={formData.loading}
                      type="submit"
                      className="email-sign-up-submit pull-right"
                      icon={<Glyphicon glyph="send" />}
                      disabled={disabled}
                      onClick={this.handleSubmit.bind(this)}
                      {...inputProps.submit}>
          Sign Up
        </ButtonLoader>
      </form>
    );
  }
}

export default connect(({auth}) => ({auth}))(EmailSignUpForm);
