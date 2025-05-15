import './App.css'
import Board from './Board';

// Helpful functions
// Array.from({length: 5})
// Math.random(10)

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}
const words = ['ready', 'aware', 'react', 'plane'];
const word = 'ready';

const Wordle = (props) => {
  return (
    <div>
      <div>{props.title}</div>
      <Board word={word}/>
    </div>
  )
}

export default Wordle;