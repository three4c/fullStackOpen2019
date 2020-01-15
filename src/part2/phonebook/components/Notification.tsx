import React, { FC } from 'react';

interface NotificationProps {
  message: string | null;
}

const Notification: FC<NotificationProps> = props => {
  const style = {
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
  return (
    <div style={style} className="error">
      {props.message}
    </div>
  );
};

export default Notification;
