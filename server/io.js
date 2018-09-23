const IO = require('socket.io')
const MidiInterface = require('./../lib/MidiInterface')
const { events, baseChannels } = require('./../lib/shared')
const MIDI = new MidiInterface()
const channels = baseChannels.map(MIDI.channel)

module.exports = http => {
  const io = IO(http)
  io.on('connection', socket => {
    events.forEach(([event, EVENT, byte, usePitch, val1, val2]) => {
      socket.on(EVENT, params => {
        console.log(EVENT, params)
        channels[params.channel][event](params[val1] || 0)(params[val2] || 0)
      })
    })
  })
}
