import React from 'react';
import ReactDOM from 'react-dom';

import Part1 from './part1';
import Part2 from './part2';

const App = () => {
  return (
    <div>
      <Part1 />
      <Part2 />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
