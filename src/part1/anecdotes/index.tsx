import React, { FC, useState } from 'react';

interface AnecdotesProps {
  anecdotes: string[];
}

const Anecdotes: FC<AnecdotesProps> = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0));

  const handleClick = (index: number) => {
    const newArray = [...points];
    newArray[index]++;
    setPoints(newArray);
  };

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{props.anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <button onClick={() => handleClick(selected)}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote of the day</h2>
        {points.every(value => value === 0) ? (
          'not vote'
        ) : (
          <p>{props.anecdotes[points.indexOf(Math.max.apply(null, points))]}</p>
        )}
      </div>
    </>
  );
};

export default Anecdotes;
