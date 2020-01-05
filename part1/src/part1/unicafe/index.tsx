import React, { FC, useState } from 'react';

interface UniCafeProps {
  text: string;
  value: number | string;
}

const UniCafe = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;

  const Statistics: FC<UniCafeProps> = props => {
    return (
      <tr>
        <th>{props.text}</th>
        <td>{props.value}</td>
      </tr>
    );
  };

  return (
    <>
      <div>
        <h2>give feedback</h2>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <div>
        <h2>statistics</h2>
        {good || neutral || bad ? (
          <table>
            <tbody>
              <Statistics text="good" value={good} />
              <Statistics text="neutral" value={neutral} />
              <Statistics text="bad" value={bad} />
              <Statistics text="all" value={all} />
              <Statistics text="average" value={(good - bad) / all} />
              <Statistics text="positive" value={`${(good / all) * 100}%`} />
            </tbody>
          </table>
        ) : (
          <p>No feedback giiven</p>
        )}
      </div>
    </>
  );
};

export default UniCafe;
