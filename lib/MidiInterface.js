const { events, notes, octaves } = require('./shared')
const midi = require('midi')

class MidiInterface {
  static getPitch(s) {
    const pattern = /([ABCDEFG]#?)(-?\d)/
    const [match, note, octave] = s.match(pattern)
    return (12 * octaves.indexOf(octave)) + notes.indexOf(note) - 3
  }

  constructor() {
    this.Output = new midi.output()
    this.Output.openVirtualPort('MIDILAB')
    this.channel = this.channel.bind(this)
  }

  channel(channel = 0) {
    const eventsByChannel = events.reduce((all, baseEvent) => {
      const [event, EVENT, byte, usePitch] = baseEvent
      return {
        ...all,
        [event]: a => b => {
          const message = [
            byte + channel,
            usePitch ? MidiInterface.getPitch(a) : a,
            parseInt(b) || 0,
          ]
          console.log(message)
          this.Output.sendMessage(message)
        }
      }
    }, {})
    return eventsByChannel
  }
}

module.exports = MidiInterface
