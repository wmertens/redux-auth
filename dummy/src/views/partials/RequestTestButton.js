import React, { PropTypes } from "react";
import {Glyphicon} from "react-bootstrap";
import {get} from 'lodash';
import {ButtonLoader} from "../../../../src/views/bootstrap";
import {connect} from "react-redux";
import {requestTest} from "../../actions/request-test-buttons";
import {getApiUrl} from "../../../../src/utils/session-storage";

class RequestTestButton extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    endpointKey: PropTypes.string.isRequired
  };

  static defaultProps = {
    endpointKey: "default"
  };

  handleClick () {
    let url = getApiUrl() + this.props.path;
    this.props.dispatch(requestTest(url, this.props.path));
  }

  render () {
    const {path, signedIn, currentEndpointKey, endpointKey} = this.props

    let text    = "Will Fail",
        bsStyle = "danger",
        glyph   = <Glyphicon glyph="remove" />,
        loading = get(this.props, 'demoButtons.buttons[path].loading');

    if (
      signedIn && (
        currentEndpointKey === endpointKey ||
        endpointKey === "any"
      )
    ) {
      text    = "Should Succeed";
      bsStyle = "success";
      glyph   = <Glyphicon glyph="ok" />;
    }

    return (
      <ButtonLoader {...this.props}
                    loading={loading}
                    type="button"
                    icon={glyph}
                    onClick={this.handleClick.bind(this)}
                    bsStyle={bsStyle}>
        {text}
      </ButtonLoader>
    );
  }
}

export default connect(({auth, demoButtons}) => {
  return {
    signedIn: auth.user.isSignedIn,
    currentEndpointKey: auth.configure.currentEndpointKey,
    demoButtons
  };
})(RequestTestButton);
