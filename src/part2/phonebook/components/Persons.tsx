import React, { FC } from 'react';

interface PersonsProps {
  persons: {
    name: string;
    number: string;
  }[];
  filterName: string;
}

const Persons: FC<PersonsProps> = props => {
  return (
    <ul>
      {props.persons
        .filter(item => item.name.toLowerCase().search(props.filterName.toLowerCase()) !== -1)
        .map((item, index) => (
          <li key={index}>
            {item.name} {item.number}
          </li>
        ))}
    </ul>
  );
};

export default Persons;
