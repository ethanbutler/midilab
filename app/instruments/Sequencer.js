import React from 'react'

const isBeat = (beat, division) => (beat % (96 / division)) === 0
const getBeat = (beat, division) => (beat / (96 / division))

class Sequencer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: 'C3',
      beatCount: 16,
      beats: [],
      activeBeat: null,
      duration: 100, // ms
      on: true,
    }
    this.play = this.play.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    document.addEventListener('BEAT', this.play)
  }

  componentWillUnmount() {
    document.removeEventListener('BEAT', this.play)
    if(this.decay) clearTimeout(this.decay)
  }

  play({ detail }) {
    const { beat } = detail
    const { note, velocity, duration, beatCount } = this.state
    const { noteOn, noteOff } = this.props
    if(isBeat(beat, beatCount)) {
      const activeBeat = getBeat(beat, beatCount)
      this.setState({ activeBeat })
      noteOn({ note, velocity })
      this.decay = setTimeout(() => noteOff({ note }),  duration)
    }
  }

  toggle(index) {
    const isOn = this.state.beats.includes(index)
    const beats = isOn ?
      this.state.beats.filter(beat => beat !== index) :
      [...this.state.beats, index]
    this.setState({ beats })
  }

  render() {
    const { beatCount, beats, activeBeat } = this.state
    const pads = Array.from(Array(beatCount)).map((a, index) => ({
      index,
      isOn: beats.includes(index),
      isPlaying: activeBeat === index
    }))

    return (
      <div className="Sequencer">
        {pads.map(({ index, isOn, isPlaying }) => (
          <div className="Sequencer-Inner">
            <div
              className={`Sequencer-Pad ${isOn ? 'isOn' : ''} ${isPlaying ? 'isPlaying' : ''}`}
              key={index}
              onTouchStart={() => this.toggle(index)}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Sequencer