import React, { FC, useState } from 'react';

interface AnecdotesProps {
  anecdotes: string[];
}

const Anecdotes: FC<AnecdotesProps> = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0));

  const handleClick = (index: number, array: number[]) => {
    array[index] += 1;
    setPoints(array);
    console.log(points[selected]);
  };

  console.log(points);

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => handleClick(selected, points)}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))}>next anecdote</button>
    </div>
  );
};

export default Anecdotes;
