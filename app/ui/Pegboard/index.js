import React, { Fragment } from 'react'

const Dot = ({ className = '' }) => <div className={`Dot ${className}`} />

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
      a: null,
      b: null,
    }
    this.touch = this.touch.bind(this)
    this.doubletouch = this.touch.bind(this)
    this.class = this.class.bind(this)
  }

  class({ x, y }) {
    const { a, b } = this.state
    if(a && (a.x === x) && (a.y === y)) return 'FirstClick'
    if(b && b.x === x && b.y === y) return 'SecondClick'
    if(
      a &&
      b &&
      ((x >= a.x && x <= b.x) || (x >= b.x && x <= a.x)) &&
      ((y >= a.y && y <= b.y) || (y >= b.y && y <= a.y))
    ) return 'Intermediate'
    return ''
  }

  touch(value) {
    const { a, b } = this.state
    const key = this.state.a ? 'b' : 'a'
    if(a && b) {
      return this.setState({ a: value, b: null })
    }
    if(a) {
      return this.setState({ [key]: value }, () => {
        const { a, b } = this.state
        const x1 = a.x < b.x ? a.x : b.x
        const y1 = a.y < b.y ? a.y : b.y
        const x2 = (a.x >= b.x ? a.x : b.x) + 1
        const y2 = (a.y >= b.y ? a.y : b.y) + 1
        console.log({ x1, y1, x2, y2 })
        this.props.onSelect({ x1, y1, x2, y2 })
      })
    }
    this.setState({ a: value })
    
  }

  render() {
    const { children } = this.props
    const { width, height } = this.state
    const w = Array.from(Array(width))
    const h = Array.from(Array(height))

    return (
      <div className="Pegboard" >
        {h.map((a, y) => (
          <div className="Pegboard-Row" key={`r${y}`}>
            {w.map((b, x) => (
              <div className="Pegboard-Col" key={`c${x}`} onClick={() => this.touch({ x, y })}>
                <Dot className={this.class({ x, y })} />
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