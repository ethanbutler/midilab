import Instrument from '../Instrument'

const XYPad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: .5,
      y: .5,
    }
  }
  render() {
    return (
      <Instrument>
        {({ controlChange }) => }
      </Instrument>
    )
  }
}
