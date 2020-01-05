import React, { FC } from 'react';

interface HeaderProps {
  course: string;
}

const Header: FC<HeaderProps> = props => {
  return <h1>{props.course}</h1>;
};

export default Header;
