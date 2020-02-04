import React, { FC } from 'react';

interface PeopleFormProps {
  onSubmit: any;
  onChangeName: any;
  newName: string;
  onChangeNumber: any;
  newNumber: string;
}

const PeopleForm: FC<PeopleFormProps> = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <div>
          name: <input onChange={e => props.onChangeName(e.target.value)} value={props.newName} />
        </div>
        <div>
          number:{' '}
          <input onChange={e => props.onChangeNumber(e.target.value)} value={props.newNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PeopleForm;
