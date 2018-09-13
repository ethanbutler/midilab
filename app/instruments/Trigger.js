import React from 'react'
import PropTypes from 'prop-types'
import { pitches } from '../../lib/shared'

class Trigger extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPlaying: false,
      note: props.note,
      velocity: props.velocity,
    }

    this.note = this.note.bind(this)
    this.on = this.on.bind(this)
    this.off = this.off.bind(this)
  }

  note(note) {
    this.setState({ note })
  }

  on() {
    const { note, velocity } = this.state
    this.setState({ isPlaying: true })
    this.props.noteOn({ note, velocity})
  }

  off() {
    const { note } = this.state
    this.setState({ isPlaying: false })
    this.props.noteOff({ note })
  }

  render() {
    return (
      <div className="Trigger">
        <select onChange={e => this.note(e.target.value)} value={this.state.note}>
          {pitches.map(pitch => (<option key={pitch}>{pitch}</option>))}
        </select>
        <div
          className="Trigger-Pad"
          onTouchStart={this.on}
          onTouchEnd={this.off}
          style={{ background: this.state.isPlaying ? 'white' : 'red' }}
        />
      </div>
    )
  }
}

Trigger.propTypes = {
  note: PropTypes.string,
  velocity: PropTypes.number,
  noteOn: PropTypes.func.isRequired,
  noteOff: PropTypes.func.isRequired,
}

Trigger.defaultProps = {
  note: 'C3',
  velocity: 90,
}

export default Trigger
