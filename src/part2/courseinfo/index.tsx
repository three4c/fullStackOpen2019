import React, { Fragment } from 'react';

import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const CourseInfo = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  const rows = () =>
    courses.map((item, index) => (
      <Fragment key={index}>
        <Header course={item.name} />
        <Content parts={item.parts} />
        <Total parts={item.parts} />
      </Fragment>
    ));

  return (
    <div>
      <h1>Web development curriculum</h1>
      {rows()}
    </div>
  );
};

export default CourseInfo;
