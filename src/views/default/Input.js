import React, {PropTypes} from "react";

class AuthInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    errors: PropTypes.object
  };

  static defaultProps = {
    label: "",
    value: null,
    errors: []
  };

  handleInput (ev) {
    this.props.onChange(ev.target.value);
  }

  renderErrorList () {
    const {errors, label} = this.props
    if (errors.length) {
      return (
        <div className='auth-error-message'>
          {errors.map((err, i) => {
            return (
              <p className="inline-error-item"
                 style={{paddingLeft: "20px", position: "relative", marginBottom: "28px"}}
                 key={i}>
                <i style={{
                  position: "absolute",
                  left: 0,
                  top: 0}}>{"✗"}</i>
                {label} {err}
              </p>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    const {label, ...rest} = this.props
    return (
      <div>
        <label>{label}</label>
        <input
          placeholder={label}
          {...rest}
          onChange={this.handleInput.bind(this)} />
        {this.renderErrorList()}
      </div>
    );
  }
}

export default AuthInput;
