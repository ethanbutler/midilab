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
      channel: props.channel
    }
    const baseEvents = {
      setChannel: channel => { this.setState({ channel }) }
    }
    this.events = props.events.reduce((all, [event, EVENT]) => ({
      ...all,
      [event]: (params) => this.emit(EVENT, params)
    }), baseEvents)
    this.emit = this.emit.bind(this)
  }

  emit(event, params = {}) {
    const { channel } = this.state
    const args = { channel, ...params }
    this.props.io.emit(event, args)
  }

  render() {
    return this.props.children(this.events)
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
