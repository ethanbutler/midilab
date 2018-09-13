import React from 'react'

class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      value: 60,
    }
  }
  onChange(e) {
    const { value } = e.target
    this.setState({ value })
    this.props.controlChange({ controller: this.props.controller, value })
  }
  render() {
    const { value } = this.state
    return (
      <div className="Slider">
        <div style={{ width: `${value / 127 * 100}%` }} />
        <input type="range" min="0" max="127" onChange={this.onChange} value={value} />
      </div>
    )
  }
}

export default Slider
