import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Display = ({anecdotes, points}) => {
  return (
    <div>
      <p>{anecdotes}</p>
      <p>has {points} points</p>
    </div>
  )
}

const App = () => {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleNextAnecdote = () => {
    return setSelected(getRandomInt(8))
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8))
  const [mostVotes, setMostVotes] = useState(0)

  const indexOfLargestValue = points.reduce((maxIndex, currentValue, currentIndex, array) => currentValue > array[maxIndex] ? currentIndex : maxIndex, 0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdotes={anecdotes[selected]} points={points[selected]} />
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNextAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Display anecdotes={anecdotes[indexOfLargestValue]} points={points[indexOfLargestValue]} />
    </div>
  )
}

export default App