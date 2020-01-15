import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Person from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const Phonebook = () => {
  const [persons, setPersons] = useState([{ name: '', number: '', id: 0 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
        personService
          .update(id, { name: newName, number: newNumber })
          .then(() => personService.getAll().then(initialPersons => setPersons(initialPersons)));
      }
    };

    persons.find(item => item.name === newName)
      ? putPhonenumber(persons[persons.findIndex(item => item.name === newName)].id)
      : personService.create(newPersonObject).then(initialPersons => {
          setPersons(persons.concat(initialPersons));
          setSuccessMessage('Success!');
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });

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
      <Notification message={successMessage} />
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
