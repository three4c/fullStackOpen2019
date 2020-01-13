import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Person from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const Phonebook = () => {
  const [persons, setPersons] = useState([{ name: '', number: '', id: 0 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const addPhonebook = (event: any) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    };

    const putPhonenumber = (id: number) => {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (result) {
        personService.update(id, { ...persons, number: newNumber });
      }
    };

    persons.find(item => item.name === newName)
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      : personService
          .create(newPersonObject)
          .then(initialPersons => setPersons(persons.concat(initialPersons)));

    setNewName('');
    setNewNumber('');
  };

  const deletePhonebook = (id: number) => {
    personService
      .delete(id)
      .then(() => personService.getAll().then(initialPersons => setPersons(initialPersons)));
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
      <Persons persons={persons} filterName={filterName} onClick={deletePhonebook} />
    </div>
  );
};

export default Phonebook;
