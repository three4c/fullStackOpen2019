import React, { FC } from 'react';

interface ContentProps {
  parts: {
    name: string;
    exercises: number;
  }[];
}

const Content: FC<ContentProps> = props => {
  return (
    <>
      {props.parts.map((item, index) => (
        <p key={index}>
          {item.name} {item.exercises}
        </p>
      ))}
    </>
  );
};
export default Content;
