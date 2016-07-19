import React, { PropTypes } from "react";
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { emailSignUpFormUpdate, emailSignUp } from "../../actions/email-sign-up";
import { connect } from "react-redux";
import ContentSend from "material-ui/svg-icons/content/send";

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
    console.log("@-->handling submit");
    event.preventDefault();
    let formData = this.props.auth.emailSignUp[this.getEndpoint()].form;
    this.props.dispatch(emailSignUp(formData, this.getEndpoint()));
      .then(this.props.next)
      .catch(() => {});
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
            style={{clear: "both", overflow: "hidden"}}
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text"
               floatingLabelText="Email"
               className="email-sign-up-email"
               disabled={disabled}
               value={form.email}
               errors={errors.email}
               onChange={this.handleInput.bind(this, "email")}
               {...inputProps.email} />

        <Input type="password"
               floatingLabelText="Password"
               className="email-sign-up-password"
               disabled={disabled}
               value={form.password}
               errors={errors.password}
               onChange={this.handleInput.bind(this, "password")}
               {...inputProps.password} />

        <Input type="password"
               floatingLabelText="Password Confirmation"
               className="email-sign-up-password-confirmation"
               disabled={disabled}
               value={form.password_confirmation}
               errors={errors.password_confirmation}
               onChange={this.handleInput.bind(this, "password_confirmation")}
               {...inputProps.passwordConfirmation} />

        <ButtonLoader loading={loading}
                      type="submit"
                      className="email-sign-up-submit"
                      primary={true}
                      style={{float: "right"}}
                      icon={ContentSend}
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
