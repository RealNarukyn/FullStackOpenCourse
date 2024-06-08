import { useState } from 'react'

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h2>{title}</h2>

      <p>
        <i>{anecdote}</i>
      </p>

      <p>
        Has {votes} upvotes ⬆
      </p>

    </div>
  )
}

const App = () => {

  const getRandomNum = max => Math.floor(Math.random() * max);

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

  const [curAnecdote, setCurAnecdote] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const hOnClickRandomAnecdote = () => setCurAnecdote(getRandomNum(anecdotes.length));
  const hOnClickUpvote = () => {
    const copy = [...votes];
    copy[curAnecdote] = copy[curAnecdote] + 1;

    setVotes(copy);
  };

  const getIndexOfMax = arr => {
    if (arr.length === 0) {
        return -1;
    }

    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
  }


  return (
    <div>

      <Anecdote title={'Anecdote of the day'} anecdote={anecdotes[curAnecdote]} votes={votes[curAnecdote]} />

      <Anecdote title={'Most voted anecdote'} anecdote={anecdotes[getIndexOfMax(votes)]} votes={votes[getIndexOfMax(votes)]} />

      <p>
        <button onClick={hOnClickUpvote}>UpVote</button>
      </p>

      <p>
        <button onClick={hOnClickRandomAnecdote}>Get Random Anecdote!</button>
      </p>

    </div>
  )
}

export default App