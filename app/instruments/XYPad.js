import React from 'react'

const MIDI_MAX_VALUE = 127

class XYPad extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onFreeze = this.onFreeze.bind(this)
    this.state = {
      x: 60,
      y: 60,
      freeze: null,
    }
    this.el = null
  }

  onChange(e) {
    const { freeze } = this.state
    const [touch] = e.touches
    const { clientX, clientY } = touch
    const { top, bottom, left, right } = this.el.getBoundingClientRect()
    const xpct = (clientX - left) / (right - left)
    const ypct = (clientY - top) / (bottom - top)
    let x = (xpct * MIDI_MAX_VALUE)|0
    let y = (ypct * MIDI_MAX_VALUE)|0

    if(x < 0) x = 0
    if(x > MIDI_MAX_VALUE) x = MIDI_MAX_VALUE

    if(y < 0) y = 0
    if(y > MIDI_MAX_VALUE) y = MIDI_MAX_VALUE

    if(!freeze) {
      this.setState({ x, y })
      this.props.controlChange({ controller: this.props.xController, value: x })
      this.props.controlChange({ controller: this.props.yController, value: y })
    } else if(freeze !== 'x') {
      this.setState({ x })
      this.props.controlChange({ controller: this.props.xController, value: x })
    } else if(freeze !== 'y') {
      this.setState({ y })
      this.props.controlChange({ controller: this.props.yController, value: y })
    }
  }

  onFreeze(xOrY) {
    if(this.state.freeze === xOrY) {
      this.setState({ freeze: null })
    } else {
      this.setState({ freeze: xOrY })
    }
  }

  render() {
    const { x, y, freeze } = this.state
    return (
      <div className="XYPad-Wrap">
        <div className="XYPad" onTouchMove={this.onChange} ref={el => { this.el = el }}>
          <div className="XYPad-Inner" style={{ top: `${y / MIDI_MAX_VALUE * 100}%`, left: `${x/ MIDI_MAX_VALUE * 100}%`}} />
        </div>
        <div className="XYPad-Freeze">
          <div className="XYPad-FreezeLabel">Freeze:</div>
          <div className="XYPad-FreezeButton" onClick={() => this.onFreeze('x')} style={{ opacity: freeze === 'x' ? 1 : .5 }}>
            X
          </div>
          <div className="XYPad-FreezeButton" onClick={() => this.onFreeze('y')} style={{ opacity: freeze === 'y' ? 1 : .5 }}>
            Y
          </div>
        </div>
      </div>
    )
  }
}

export default XYPad