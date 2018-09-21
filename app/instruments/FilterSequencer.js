import React from 'react'
import PropTypes from 'prop-types'

const MIDI_MAX_VALUE = 127

const isBeat = (beat, division) => (beat % (96 / division)) === 0
const getBeat = (beat, division) => (beat / (96 / division))

class FilterSequencer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: Array.from(Array(props.beats)).fill(60),
      activeBeat: null,
      on: true,
      controller: props.controller,
    }
    this.el = null
    this.touch = this.touch.bind(this)
    this.play = this.play.bind(this)
  }

  componentDidMount() {
    document.addEventListener('BEAT', this.play)
  }

  componentWillUnmount() {
    document.removeEventListener('BEAT', this.play)
    if(this.decay) clearTimeout(this.decay)
  }

  touch(e) {
    const { values } = this.state
    const [touch] = e.touches
    const { clientX, clientY } = touch
    const { left, right, top, bottom } = this.el.getBoundingClientRect()
    const pct = (bottom - clientY) / (bottom - top)
    const divisions = (right - left) / values.length

    let index =  ((clientX - left) / divisions)|0
    let value = (pct * MIDI_MAX_VALUE)|0

    if(index < 0 || index > values.length - 1) return

    if(value < 0) value = 0
    if(value > MIDI_MAX_VALUE) value = MIDI_MAX_VALUE

    this.setState(state => {
      const values = [...state.values]
      values[index] = value
      return { values }
    })
  }

  play({ detail }) {
    const { beat } = detail
    const { controller, values } = this.state
    const { controlChange } = this.props
    if(isBeat(beat, values.length)) {
      const activeBeat = getBeat(beat, values.length)
      const value = values[activeBeat]
      this.setState({ activeBeat })
      controlChange({ controller, value })
    }
  }

  render() {
    const { activeBeat, values } = this.state

    return (
      <div className="FilterSequencer" onTouchMove={this.touch} ref={el => { this.el = el }}>
        {values.map((value, index) => ({ value, index })).map(({ value, index}) => (
          <div
            key={index}
            className={`FilterSequencer-Bar ${activeBeat === index ? 'isPlaying' : ''}`}
            style={{ height: `${value / MIDI_MAX_VALUE * 100}%` }}
          />
        ))}
      </div>
    )
  }
}

FilterSequencer.propTypes = {
  beats: PropTypes.number,
}

FilterSequencer.defaultProps = {
  beats: 16,
}

export default FilterSequencer