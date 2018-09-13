const events = [
  ['noteOff',              'NOTE_OFF',              128, true,  'note',       null],
  ['noteOn',               'NOTE_ON',               144, true,  'note',       'velocity'],
  ['polyphonicAftertouch', 'POLYPHONIC_AFTERTOUCH', 160, true,  'note',       'pressure'],
  ['controlChange',        'CONTROL_CHANGE',        176, false, 'controller', 'value'],
  ['programChange',        'PROGRAM_CHANGE',        192, false, 'program',    null],
  ['channelPressure',      'CHANNEL_PRESSURE',      208, false, 'pressure',   null],
  ['pitchBend',            'PITCH_BEND',            224, false, 'msb',        'lsb'],
]
const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const octaves = ['-2', '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8']
const pitches = notes.reduce((_notes, note) => ([ ..._notes, ...octaves.reduce(
  (_octaves, octave) => ([..._octaves, `${note}${octave}`]), []
)]), [])
const baseChannels = Array.from(Array(16)).map((x, i) => i)

module.exports = {
  events,
  notes,
  octaves,
  pitches,
  baseChannels
}
