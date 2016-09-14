import React, { PropTypes } from "react";
import {get} from 'lodash'
import ButtonLoader from "./ButtonLoader";
import Input from "./Input";
import { emailSignInFormUpdate, emailSignIn } from "../../actions/email-sign-in";
import { connect } from "react-redux";

class EmailSignInForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    next: PropTypes.func,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
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
    this.props.dispatch(emailSignInFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (event) {
    event.preventDefault();
    let formData = this.props.auth.emailSignIn[this.getEndpoint()].form;
    this.props.dispatch(emailSignIn(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render () {
    let disabled = (
      this.props.auth.user.isSignedIn ||
      get(this.props, 'auth.emailSignIn[this.getEndpoint()].loading')
    );

    return (
      <form className='redux-auth email-sign-in-form'
            style={{clear: "both", overflow: "hidden"}}
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text"
               className="email-sign-in-email"
               label="Email"
               disabled={disabled}
               value={get(this.props, 'auth.emailSignIn[this.getEndpoint()].form.email')}
               errors={get(this.props, 'auth.emailSignIn[this.getEndpoint()].errors.email')}
               onChange={this.handleInput.bind(this, "email")}
               {...this.props.inputProps.email} />

        <Input type="password"
               label="Password"
               className="email-sign-in-password"
               disabled={disabled}
               value={get(this.props, 'auth.emailSignIn[this.getEndpoint()].form.password')}
               errors={get(this.props, 'auth.emailSignIn[this.getEndpoint()].errors.password')}
               onChange={this.handleInput.bind(this, "password")}
               {...this.props.inputProps.password} />

        <ButtonLoader loading={this.props.auth.emailSignIn.loading}
                      type="submit"
                      style={{float: "right"}}
                      icon={this.props.icon}
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
