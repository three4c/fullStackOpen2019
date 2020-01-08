import React, { useState } from 'react';
import Filter from './components/Filter';
import Person from './components/PersonForm';
import Persons from './components/Persons';

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const addPhonebook = (event: any) => {
    event.preventDefault();

    const newPeersonObject = {
      name: newName,
      number: newNumber
    };

    persons.find(item => item.name === newName)
      ? window.alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPeersonObject));

    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={setFilterName} />
      <h3>Add a new</h3>
      <Person
        onSubmit={addPhonebook}
        onChangeName={setNewName}
        newName={newName}
        onChangeNumber={setNewNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default Phonebook;
