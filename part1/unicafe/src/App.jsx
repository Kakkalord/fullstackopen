import { useState } from 'react'

// a proper place to define a component
const Statistics = ({presentStatistics, good, neutral, bad}) => {
  // ...

  const total = {good} + {neutral} + {bad}

  if (presentStatistics === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={good + neutral + bad} />
      <StatisticLine text='average' value={(good - bad)/(good + neutral + bad)} />
      <StatisticLine text='positive' value={good / (good + neutral + bad) *100}/>
    </div>
  )
}

const StatisticLine = ({text, value}) => <p>{text}: {value}</p>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics presentStatistics={good+neutral+bad} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
