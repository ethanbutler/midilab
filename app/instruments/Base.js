import React, { Fragment } from 'react'

const Base = ({
  setChannel,
  noteOn,
  noteOff,
  pitchBend,
  note = 'C5',
  velocity = 90,
  children,
}) => (
  <Fragment>
    <div>
      <select onChange={e => setChannel(e.target.value)}>
        {Array.from(Array(16)).map((x, i) => (
          <option value={i} key={`_${i}`}>{`Channel ${i + 1}`}</option>
        ))}
      </select>
    </div>
    <button onClick={() => noteOn({ note, velocity })}>On</button>
    <button onClick={() => noteOff({ note })}>Off</button>
    <input
      type="range"
      min="0"
      max="127"
      defaultValue="64"
      onChange={e => pitchBend({ lsb: e.target.value, msb: 0 }) }
    />
    {children && children()}
  </Fragment>
)

export default Base
