import { Sequencer, Slider, XYPad } from './instruments'

const instruments = [
  { uid: 'a', x: 0, y: 0, w: 3, h: 3, render: XYPad },
  { uid: 'b', x: 0: y: 3, w: 3, h: 3, render: XYPad },
  { uid: 'c', x: 0: y: 6, w: 3, h: 1, render: Slider },
  { uid: 'd', x: 0: y: 7, w: 3, h: 1, render: Slider },
  { uid: 'e', x: 0, y: 8: w: 3, h: 1, render: Slider },
  { uid: 'f', x: 3, y: 0: w: 10, h: 2, render: Sequencer },
  { uid: 'g', x: 3, y: 2: w: 10, h: 2, render: Sequencer },
  { uid: 'h', x: 3, y: 4: w: 10, h: 2, render: Sequencer },
  { uid: 'k', x: 3, y: 6: w: 10, h: 2, render: Sequencer },
]

class Pegboard extends React.Component {
  constructor(props) {
    this.state = {
      instruments,
      active: null
    }
  }

  handleInstrumentLongPress(active) {
    this.setState({ active })
  }

  render() {
    const { instruments, active } = this.state
    return (
      <Board>
        <Background x={16} y={9} />
        {instruments.map(({ Component, uid, ...item } => (
          <Primitives.LongPressable
            key={uid}
            d={500}
            onLongPress={() => this.handleInstrumentLongPress(instrument.uid)}
          >
            <Item {...item}>
              <Component>
                {(uid === active) && props => (<Settings {...props} />)}
              </Component>
            </Item>
          </Primitives.LongPressable>
        ))}
      </Board>
    )
  }
}
