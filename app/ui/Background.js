const Background = ({
  x,
  y,
  onClick,
}) => (
  Array.fill(x).map((a, j) => j).map(z => (
    <div key={z}>
      {Array.fill(y).map((b, k) => k).map(w => (
        <div key={w} onClick={() => onClick(z, w)} />
      ))}
    </div>
  ))
)
