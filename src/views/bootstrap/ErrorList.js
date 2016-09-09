import React, { PropTypes } from "react";
import { Glyphicon } from "react-bootstrap";

class ErrorList extends React.Component {
  static propTypes = {
    errors: PropTypes.object
  };

  static defaultProps = {
    errors: []
  };

  renderErrorList () {
    const {errors} = this.props
    let errorCount = errors && errors.length || 0;

    if (errorCount > 0) {
      // pluralize message
      let errorWord = "error";
      errorWord += (errorCount === 1) ? "" : "s";

      return (
        <div className="has-error">
          <p>Please correct the following {errorWord}:</p>
          {errors.map((err, i) => {
            return (
              <p
                key={i}
                className="control-label modal-error-item"
                style={{paddingLeft: "20px", position: "relative"}}>
                <Glyphicon glyph="exclamation-sign"
                           style={{position: "absolute", left: 0, top: 2}} /> {err}
              </p>
            );
          })}
        </div>
      );
    } else {
      return (
        <p>
          <Glyphicon glyph="exclamation-sign" /> There was an error processing
          this form. Please check each field and try again.
        </p>
      );
    }
  }

  render () {
    return (
      <div className="auth-error-message">
        {this.renderErrorList()}
      </div>
    );
  }
}

export default ErrorList;
