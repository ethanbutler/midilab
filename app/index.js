import React from 'react'
import { render } from 'react-dom'
import nanoid from 'nanoid'
import Pegboard from './ui/Pegboard'
import Instrument from './Instrument'
import { Slider, XYPad, Trigger, Sequencer, FilterSequencer } from './instruments'

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
      activeInstrument: null,
    }
    this.handlePegboard = this.handlePegboard.bind(this)
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
        render: props => <Component {...props} vertical={coords.x2 - coords.x1 < coords.y2 - coords.y1} />,
        ...coords,
      }]
    }))
  }
  render() {
    const { activeInstrument, instruments, coords } = this.state
    return (
      <div className="MIDILab">
        <Pegboard onSelect={this.handlePegboard}>
          {props => instruments
            .map((item, id) => ({ ...item, id }))
            .map(({ render, id, ...coords}) => (
              <Pegboard.Item {...coords} {...props} key={id}>
                <Instrument
                  active={(id === activeInstrument)}
                  onSelect={() => this.setState({ activeInstrument: id })}
                >
                  {render}
                </Instrument>
              </Pegboard.Item>
            ))
          }
        </Pegboard>
        {coords && (
          <div className="MIDILab-Chooser">
            <select onChange={e => this.handleSelect(e.target.value)}>
              <option value={null}>Choose an instrument</option>
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
