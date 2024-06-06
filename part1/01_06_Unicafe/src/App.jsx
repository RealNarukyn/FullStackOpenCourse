import { useState } from 'react'

const MyButton = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, data }) => <p>{text}: {data? data : 0}</p>

const Statistics = () => <div>ToDo...</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood]         = useState(0);
  const [neutral, setNeutral]   = useState(0);
  const [bad, setBad]           = useState(0);

  const [allStats, setAllStats] = useState(0);
  const [average, setAverage]   = useState(0);

  const hOnClickGood = () => {
    const uGood = good + 1;
    
    setGood(uGood);
    setAllStats(uGood + neutral + bad);
    
    setAverage(average + 1);
  }

  const hOnClickNeutral = () => {
    const uNeutral = neutral + 1;
    
    setNeutral(uNeutral);
    setAllStats(good + uNeutral + bad);
  }

  const hOnClickBad = () => {
    const uBad= bad + 1;
    
    setBad(uBad);
    setAllStats(good + neutral + uBad);

    setAverage(average - 1);
  }

  const getAverage = () => average / allStats;
  const getPositivePercent = () => (good / allStats) * 100;

  return (
    

    <div>
      <h2>Give Feedback! 😉</h2>
      <MyButton onClick={hOnClickGood} text={'good'} />
      <MyButton onClick={hOnClickNeutral} text={'neutral'} />
      <MyButton onClick={hOnClickBad} text={'bad'} />
      
      <h2>Statistics:</h2>
      <StatisticLine text={'Good'}    data={good} />
      <StatisticLine text={'Neutral'} data={neutral} />
      <StatisticLine text={'Bad'}     data={bad} />

      <StatisticLine text={'All Votes'} data={allStats}/>
      <StatisticLine text={'Average'}   data={getAverage()}/>
      <StatisticLine text={'Positive'}  data={allStats > 0 ? getPositivePercent() + '%' : '0%'}/>

    </div>
  )
}

export default App