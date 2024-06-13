import { useState } from 'react'

const SimpleButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

const getRandomInt = (min, max, prev = -1) => {
  let random;
  do {
    random = Math.floor(Math.random() * (max - min)) + min;
  } while (random === prev);
  return random;
};

const getMaxIndex = (arr) => {
  return arr.reduce((maxIndex, currentValue, currentIndex, array) => {
    return currentValue > array[maxIndex] ? currentIndex : maxIndex;
  }, 0);
};

const hasData = (arr) => {
  return arr.reduce((hasData, value) => {
    return hasData || value > 0
  }, 0)
}

const App = () => {
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
  const [votes, setVotes] = useState(anecdotes.map(() => 0))
  
  const setDisplayedAnecdote = () => setSelected(getRandomInt(0, anecdotes.length, selected))

  const voteForCurrentAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div style={{ height: '50px' }}>
        <div>Anecdote: {anecdotes[selected]}</div>
      </div>
      <div>
        <div>Vote: {votes[selected]}</div>
      </div>
      <div>
        <SimpleButton onClick={voteForCurrentAnecdote}>
          Vote
        </SimpleButton>
        <SimpleButton onClick={setDisplayedAnecdote}>
          Next anecdote
        </SimpleButton>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
      </div>
      <div>
        {hasData(votes) ? (
          <div>
            {anecdotes[getMaxIndex(votes)]} <br />
            Has {votes[getMaxIndex(votes)]} votes!
          </div>
        ) : (
          <b>Zero votes have been cast</b>
        )}

      </div>
    </div>
  )
}

export default App
