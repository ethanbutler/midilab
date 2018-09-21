import React from 'react'
import { render } from 'react-dom'
import Pegboard from './ui/Pegboard'
import Instrument from './Instrument'
import { Slider, XYPad, Trigger, Sequencer, FilterSequencer } from './instruments'

const Instruments = [
  {
    x1: 0,
    x2: 3,
    y1: 0,
    y2: 3,
    render: props => <XYPad {...props} />,
  },
  {
    x1: 3,
    x2: 8,
    y1: 0,
    y2: 1,
    render: props => <Slider {...props} />,
  },
  {
    x1: 3,
    x2: 8,
    y1: 1,
    y2: 2,
    render: props => <Slider {...props} />,
  },
  {
    x1: 3,
    x2: 8,
    y1: 2,
    y2: 3,
    render: props => <Slider {...props} />,
  },
  {
    x1: 0,
    x2: 1,
    y1: 3,
    y2: 4,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 1,
    x2: 2,
    y1: 3,
    y2: 4,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 2,
    x2: 3,
    y1: 3,
    y2: 4,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 3,
    x2: 4,
    y1: 3,
    y2: 4,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 4,
    x2: 5,
    y1: 3,
    y2: 4,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 5,
    x2: 6,
    y1: 3,
    y2: 4,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 6,
    x2: 7,
    y1: 3,
    y2: 4,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 7,
    x2: 8,
    y1: 3,
    y2: 4,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 8,
    x2: 12,
    y1: 0,
    y2: 4,
    render: props => <XYPad {...props} />,
  },
  {
    x1: 12,
    x2: 13,
    y1: 0,
    y2: 4,
    render: props => <Slider {...props} vertical />,
  },
  {
    x1: 13,
    x2: 14,
    y1: 0,
    y2: 4,
    render: props => <Slider {...props} vertical />,
  },
  {
    x1: 14,
    x2: 15,
    y1: 0,
    y2: 4,
    render: props => <Slider {...props} vertical />,
  },
  {
    x1: 15,
    x2: 16,
    y1: 1,
    y2: 4,
    render: props => <Slider {...props} vertical />,
  },
  {
    x1: 15,
    x2: 16,
    y1: 0,
    y2: 1,
    render: props => <Trigger {...props} />,
  },
  {
    x1: 0,
    x2: 16,
    y1: 4,
    y2: 5,
    render: props => <Sequencer {...props} />
  },
  {
    x1: 0,
    x2: 8,
    y1: 8,
    y2: 12,
    render: props => <FilterSequencer {...props} />
  }
]

const App = () => (
  <Pegboard>
    {props => Instruments.map((item, id) => ({ ...item, id })).map(({ render, id, ...coords}) => (
      <Pegboard.Item {...coords} {...props} key={id}>
        <Instrument>{render}</Instrument>
      </Pegboard.Item>
    ))}
  </Pegboard>
)

console.log('Hello!')

render(
  <App />,
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