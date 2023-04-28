function Square({ chooseSquare, val, disabled }) {
  return (
    <button className="square" onClick={chooseSquare} disabled={false}>
      {val}
    </button>
  );
}

export default Square;
