import React from 'react'
import { render } from 'react-dom'
import Instrument from './Instrument'
import Slider from './instruments/Slider'
import Trigger from './instruments/Trigger'
import Bender from './instruments/Bender'

const Pad = () => (
  <React.Fragment>
    <Instrument>{props => (<Trigger note="C3" {...props} />)}</Instrument>
    <Instrument>{props => (<Trigger note="D3" {...props} />)}</Instrument>
    <Instrument>{props => (<Trigger note="E3" {...props} />)}</Instrument>
    <Instrument>{props => (<Trigger note="F3" {...props} />)}</Instrument>
    <Instrument>{props => (<Trigger note="G3" {...props} />)}</Instrument>
    <Instrument>{props => (<Trigger note="A4" {...props} />)}</Instrument>
    <Instrument>{props => (<Trigger note="B4" {...props} />)}</Instrument>
    <Instrument>{props => (<Trigger note="C4" {...props} />)}</Instrument>
    <Instrument>{props => (<Slider {...props} controller={0} />)}</Instrument>
    <Instrument>{props => (<Slider {...props} controller={1} />)}</Instrument>
    <Instrument>{props => (<Bender {...props} />)}</Instrument>
  </React.Fragment>
)

render(
  <Pad />,
  document.getElementById('root')
)
document.addEventListener('touchmove', function(event) {
    event = event.originalEvent || event;
    if (event.scale !== 1) {
       event.preventDefault();
    }
}, false);
