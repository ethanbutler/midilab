import React from 'react'
import PropTypes from 'prop-types'
// import io from './io'
import { events } from '../lib/shared'

const io = {
  emit: () => null,
}

class Instrument extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: props.channel,
      active: false,
    }
    const baseEvents = {
      setChannel: channel => { this.setState({ channel }) }
    }
    this.events = props.events.reduce((all, [event, EVENT]) => ({
      ...all,
      [event]: (params) => this.emit(EVENT, params)
    }), baseEvents)
    this.emit = this.emit.bind(this)
    this.start = this.start.bind(this)
    this.end = this.end.bind(this)
    this.timer = null
  }

  emit(event, params = {}) {
    const { channel } = this.state
    const args = { channel, ...params }
    this.props.io.emit(event, args)
  }

  start() {
    this.timer = setTimeout(this.props.onSelect, 200)
  }

  end() {
    if(this.timer) clearTimeout(this.timer)
  }

  render() {
    const { active } = this.props
    const { channel } = this.state
    return (
      <React.Fragment>
        <div onTouchStart={this.start} onTouchEnd={this.end} className={active ? 'Instrument-Active' : ''}>
          {this.props.children(this.events)}
        </div>
        {active && (
          <div className="Instrument-Settings">
            <div className="Instrument-SettingsInner">
              <div>
                <label>Channel</label>
                <input
                  value={channel}
                  onChange={e => this.setState({ channel: e.target.value })}
                  type="number"
                />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

Instrument.propTypes = {
  channel: PropTypes.number,
  io: PropTypes.shape({
    emit: PropTypes.func,
  }),
  events: PropTypes.arrayOf(PropTypes.array)
}

Instrument.defaultProps = {
  channel: 0,
  io,
  events,
}

export default Instrument
