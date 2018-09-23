import React from 'react'
import { render } from 'react-dom'
import nanoid from 'nanoid'
import Pegboard from './ui/Pegboard'
import Instrument from './Instrument'
import { Slider, XYPad, Trigger, Sequencer, FilterSequencer } from './instruments'

// const Instruments = [
//   {
//     x1: 0,
//     x2: 3,
//     y1: 0,
//     y2: 3,
//     render: props => <XYPad {...props} />,
//   }
// ]

class MIDILab extends React.Component {
  static get instruments() {
    return {
      'Filter Sequencer': FilterSequencer,
      'Sequencer': Sequencer,
      'Slider': Slider,
      'Trigger': Trigger,
      'X/Y Pad': XYPad,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      instruments: [],
      settings: null,
      coords: null,
    }
    this.handlePegboard = this.handlePegboard.bind(this)
  }
  handleInstrument(settings) {

  }
  handlePegboard(coords) {
    this.setState({ coords })
  }
  handleSelect(key) {
    const { coords } = this.state
    const Component = MIDILab.instruments[key]
    this.setState(({ instruments }) => ({
      coords: null,
      instruments: [...instruments, {
        id: nanoid(),
        render: props => <Component {...props} />,
        ...coords,
      }]
    }))
  }
  render() {
    const { instruments, coords } = this.state
    return (
      <div className="MIDILab">
        <Pegboard onSelect={this.handlePegboard}>
          {props => instruments
            .map((item, id) => ({ ...item, id }))
            .map(({ render, id, ...coords}) => (
              <Pegboard.Item {...coords} {...props} key={id}>
                <Instrument onSelection={this.handleInstrument}>{render}</Instrument>
              </Pegboard.Item>
            ))
          }
        </Pegboard>
        {coords && (
          <div className="MIDILab-Chooser">
            <select onChange={e => this.handleSelect(e.target.value)}>
              <option value={null}>Instrument</option>
              {Object.keys(MIDILab.instruments)
                .map(key => <option key={key}>{key}</option>)
              }
            </select>
          </div>
        )}
      </div>
    )
  }
}

console.log('Hello!')

render(
  <MIDILab />,
  document.getElementById('root')
)

const MIDI_SUBDIVISION = 96

document.beat = 0
setInterval(() => {
  const { beat } = document
  const e = new CustomEvent('BEAT', { detail: { beat }})
  document.dispatchEvent(e)

  const nextBeat = beat + 1
  document.beat = nextBeat === MIDI_SUBDIVISION ? 0 : nextBeat
}, 250)