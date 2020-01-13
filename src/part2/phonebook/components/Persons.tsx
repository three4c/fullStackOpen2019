import React, { FC } from 'react';

interface PersonsProps {
  persons: {
    name: string;
    number: string;
    id: number;
  }[];
  filterName: string;
  onClick: any;
}

const Persons: FC<PersonsProps> = props => {
  return (
    <ul>
      {props.persons
        .filter(item => item.name.toLowerCase().search(props.filterName.toLowerCase()) !== -1)
        .map((item, index) => (
          <li key={index}>
            {item.name} {item.number} <button onClick={() => props.onClick(item.id)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
