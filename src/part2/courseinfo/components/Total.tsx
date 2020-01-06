import React, { FC } from 'react';

interface TotalProps {
  parts: {
    name: string;
    exercises: number;
  }[];
}

const Total: FC<TotalProps> = props => {
  return (
    <p>
      <strong>total of {props.parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercies</strong>
    </p>
  );
};

export default Total;
