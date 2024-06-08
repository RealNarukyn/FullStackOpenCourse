import { useState } from 'react'

// Component < MyButton >
const MyButton = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

// Component < StatisticLine >
const StatisticLine = ({ text, data }) => {
  return (
    <tr>
      <td><b>{text}:</b></td>
      <td>{data ? data : 0}</td>
    </tr>
  )
}

// Component < Statistics >
const Statistics = ({ stats }) => {

  const getAllStats = () => stats.good + stats.neutral + stats.bad;
  const getAverage = () => (stats.good - stats.bad) / getAllStats();
  const getStatRatio = stat => (stat / getAllStats()) * 100;


  if (getAllStats() <= 0) {
    return (
      <div>
        <h2>Statistics:</h2>
        <p><b>Before looking at the statistics you gotta give feedback...</b></p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics:</h2>

      <table>
        <tbody>
          <StatisticLine text={'Good'} data={stats.good} />
          <StatisticLine text={'Neutral'} data={stats.neutral} />
          <StatisticLine text={'Bad'} data={stats.bad} />

          <StatisticLine text={'All Votes'} data={getAllStats()} />
          <StatisticLine text={'Average'} data={getAverage()} />
          {getAllStats() > 0 ?
            <StatisticLine text={'Positive Ratio'} data={getStatRatio(stats.good) + '%'} /> :
            <StatisticLine text={'Positive Ratio'} data={'0%'} />
          }
        </tbody>
      </table>
    </div>
  )
}

// Component < App >
const App = () => {
  // save clicks of each button to its own state
  const [stats, setStats] = useState({ good: 0, neutral: 0, bad: 0 });

  // Handle OnClick Fncs
  const hOnClickGood = () => setStats({ ...stats, good: stats.good + 1 });
  const hOnClickNeutral = () => setStats({ ...stats, neutral: stats.neutral + 1 });
  const hOnClickBad = () => setStats({ ...stats, bad: stats.bad + 1 });

  return (
    <div>
      <h2>Give Feedback! 😉</h2>
      <MyButton onClick={hOnClickGood} text={'good'} />
      <MyButton onClick={hOnClickNeutral} text={'neutral'} />
      <MyButton onClick={hOnClickBad} text={'bad'} />

      <Statistics stats={stats} />
    </div>
  )
}

export default App