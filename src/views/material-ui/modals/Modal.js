import React, { PropTypes } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import ErrorList from "../ErrorList";
import { connect } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BaseModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    errorAddr: PropTypes.array,
    closeBtnLabel: PropTypes.string,
    actions: PropTypes.array,
    closeAction: PropTypes.func
  };

  static defaultProps = {
    show: false,
    errorAddr: null,
    closeBtnLabel: "Ok",
    actions: []
  };

  close () {
    this.props.dispatch(this.props.closeAction());
  }

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.configure.currentEndpointKey ||
      this.props.auth.configure.defaultEndpointKey
    );
  }

  getErrorList () {
    const {auth, errorAddr} = this.props
    let [base, ...rest] = errorAddr;
    let errors = auth[base] && auth[base][this.getEndpoint()]
    rest.forEach(l => errors = errors && errors[l])
    return <ErrorList errors={errors} />
  }

  render () {
    let body = (this.props.errorAddr)
      ? this.getErrorList()
      : this.props.children;

    return (
      <MuiThemeProvider>
        <Dialog
          open={this.props.show}
          contentClassName={`redux-auth-modal ${this.props.containerClass}`}
          title={this.props.title}
          actions={[
            <FlatButton
              key="close"
              className={`${this.props.containerClass}-close`}
              onClick={this.close.bind(this)}>
              {this.props.closeBtnLabel}
            </FlatButton>,
            ...this.props.actions
          ]}>
          {body}
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default connect(({auth}) => ({auth}))(BaseModal);
