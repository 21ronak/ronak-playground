import React from 'react';

const Board = ({ word }) => {
  const [textInput, setTextInput] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const wordCompare = () => {
    const result = [];
    const wordArr = word.split('');
    const usedIndices = new Set();

    // First pass: check correct positions
    textInput.split('').forEach((char, i) => {
      if (char === wordArr[i]) {
        result.push({ value: char, status: 'correct' });
        usedIndices.add(i);
      } else {
        result.push(null); // placeholder for now
      }
    });

    // Second pass: check for partial matches
    textInput.split('').forEach((char, i) => {
      if (result[i]) return; // already correct
      const idx = wordArr.findIndex((c, j) => c === char && !usedIndices.has(j));
      if (idx !== -1) {
        result[i] = { value: char, status: 'partially-correct' };
        usedIndices.add(idx);
      } else {
        result[i] = { value: char, status: 'incorrect' };
      }
    });

    return result;
  };

  const handleSubmit = () => {
    if (textInput.length !== word.length || count >= 6) return;

    const newRow = wordCompare();
    setRows((prev) => [...prev, newRow]);
    setCount((prev) => prev + 1);
    setTextInput('');
  };

  const filledRows = [...rows];
  while (filledRows.length < 6) {
    filledRows.push(Array(word.length).fill({ value: '', status: 'empty' }));
  }

  return (
    <div>
      <div className="board">
        {filledRows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`box ${cell.status}`}
              >
                {cell.value}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="input">
        <label htmlFor="guess">Enter word: </label>
        <input
          type="text"
          id="guess"
          value={textInput}
          maxLength={word.length}
          onChange={(e) => setTextInput(e.target.value.toLowerCase())}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Board;
