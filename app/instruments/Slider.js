import React from 'react'

const MIDI_MAX_VALUE = 127

class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      value: 60,
    }
    this.el = null
  }
  onChange(e) {
    const { vertical } = this.props
    const [touch] = e.touches
    const t = touch[vertical ? 'clientY' : 'clientX']
    const [min, max] = vertical ? ['bottom', 'top'] : ['left', 'right']
    const rect = this.el.getBoundingClientRect()
    const pct = (t - rect[min]) / (rect[max] - rect[min])
    let value = (pct * MIDI_MAX_VALUE)|0

    if(value < 0) value = 0
    if(value > MIDI_MAX_VALUE) value = MIDI_MAX_VALUE

    this.setState({ value })
    this.props.controlChange({ controller: this.props.controller, value })
  }
  render() {
    const { vertical } = this.props
    const { value } = this.state
    const styleProp = vertical ? 'height' : 'width'
    const className = vertical ? 'Slider Slider--Vertical' : 'Slider'
    return (
      <div className={className} onTouchMove={this.onChange} ref={el => { this.el = el }}>
        <div className="Slider-Inner" style={{ [styleProp]: `${value / MIDI_MAX_VALUE * 100}%` }} />
      </div>
    )
  }
}

export default Slider
