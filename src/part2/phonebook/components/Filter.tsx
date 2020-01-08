import React, { FC } from 'react';

interface FilterProps {
  onChange: any;
}

const Filter: FC<FilterProps> = props => {
  return (
    <div>
      filter shown width <input onChange={e => props.onChange(e.target.value)} />
    </div>
  );
};

export default Filter;
