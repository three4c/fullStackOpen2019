import React, { FC } from 'react';

interface NotificationProps {
  message: string | null;
  isSuccess: boolean;
}

const Notification: FC<NotificationProps> = props => {
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  if (props.message === null) {
    return null;
  }
  return <div style={props.isSuccess ? success : error}>{props.message}</div>;
};

export default Notification;
