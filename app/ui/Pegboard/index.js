import React, { Fragment } from 'react'

const Dot = () => <div className="Dot" />

class Pegboard extends React.Component {
  static Item({ x1, x2, y1, y2, width, height, children }) {
    const style = {
      position: 'absolute',
      top: `${y1 / height * 100}%`,
      left: `${x1 / width * 100}%`,
      height: `${(y2 - y1) / height * 100}%`,
      width: `${(x2 - x1) / width * 100}%`,
    }
    return (
      <div style={style} className="Pegboard-Item">
        {children}
      </div>
    )
  }
  
  constructor(props) {
    super(props)
    this.state = {
      width: 16,
      height: 12,
    }

    this.Item = this.Item.bind(this)
  }

  Item({ x1, x2, y1, y2, children}) {
    const { width, height } = this.state

  }

  render() {
    const { children } = this.props
    const { width, height } = this.state
    const w = Array.from(Array(width))
    const h = Array.from(Array(height))

    return (
      <div className="Pegboard">
        {h.map((a, row) => (
          <div className="Pegboard-Row" key={`r${row}`}>
            {w.map((b, col) => (
              <div className="Pegboard-Col" key={`c${col}`}>
                <Dot />
              </div>
            ))}
          </div>
        ))}
        {children({ width, height })}
      </div>
    )
  }
}

export default Pegboard