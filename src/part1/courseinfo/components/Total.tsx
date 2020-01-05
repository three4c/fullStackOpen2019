import React, { FC } from 'react';

interface TotalProps {
  parts: {
    name: string;
    exercises: number;
  }[];
}

const Total: FC<TotalProps> = props => {
  return <p>Number of exercises {props.parts.reduce((acc, cur) => acc + cur.exercises, 0)}</p>;
};

export default Total;
