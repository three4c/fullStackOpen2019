import React, { FC } from 'react';

interface HeaderProps {
  course: string;
}

const Header: FC<HeaderProps> = props => {
  return <h2>{props.course}</h2>;
};

export default Header;
