import React from 'react'

class Bender extends React.Component {
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
    this.props.pitchBend({ msb: 0, lsb: value })
  }
  render() {
    const { value } = this.state
    return (
      <div className="Bender">
        <div style={{ width: `${value / 127 * 100}%` }} />
      </div>
    )
  }
}

export default Bender
