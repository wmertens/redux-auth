import React, { PropTypes } from "react";
import ButtonLoader from "./ButtonLoader";
import Input from "./Input";
import { emailSignInFormUpdate, emailSignIn } from "../../actions/email-sign-in";
import ActionExitToApp from "material-ui/svg-icons/action/exit-to-app";
import { connect } from "react-redux";

class EmailSignInForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
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
    this.props.dispatch(emailSignInFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (event) {
    event.preventDefault();
    let formData = this.props.auth.emailSignIn[this.getEndpoint()].form;
    this.props.dispatch(emailSignIn(formData, this.getEndpoint()));
  }

  render () {
    let disabled = (
      this.props.auth.user.isSignedIn ||
      this.props.auth.emailSignIn[this.getEndpoint()].loading
    );

    return (
      <form className='redux-auth email-sign-in-form'
            style={{clear: "both", overflow: "hidden"}}
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text"
               className="email-sign-in-email"
               ref="emailSignInEmail"
               floatingLabelText="Email"
               disabled={disabled}
               value={this.props.auth.emailSignIn[this.getEndpoint()].form.email}
               errors={this.props.auth.emailSignIn[this.getEndpoint()].errors.email}
               onChange={this.handleInput.bind(this, "email")}
               {...this.props.inputProps.email} />

        <Input type="password"
               floatingLabelText="Password"
               className="email-sign-in-password"
               disabled={disabled}
               value={this.props.auth.emailSignIn[this.getEndpoint()].form.password}
               errors={this.props.auth.emailSignIn[this.getEndpoint()].errors.password}
               onChange={this.handleInput.bind(this, "password")}
               {...this.props.inputProps.password} />

        <ButtonLoader loading={this.props.auth.emailSignIn.loading}
                      type="submit"
                      style={{float: "right"}}
                      icon={ActionExitToApp}
                      className='email-sign-in-submit'
                      disabled={disabled}
                      onClick={this.handleSubmit.bind(this)}
                      primary={true}
                      {...this.props.inputProps.submit}>
          Sign In
        </ButtonLoader>
      </form>
    );
  }
}

export default connect(({auth}) => ({auth}))(EmailSignInForm);
