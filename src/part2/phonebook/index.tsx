import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Person from './components/PersonForm';
import People from './components/People';
import personService from './services/person';
import Notification from './components/Notification';

const Phonebook = () => {
  const [people, setPeople] = useState([{ name: '', number: '', id: 0 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    personService.getAll().then(initialPeople => setPeople(initialPeople));
  }, []);

  const notification = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addPhonebook = (event: any) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: people[people.length - 1].id + 1
    };

    const putPhonenumber = (id: number) => {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (result) {
        personService
          .update(id, { name: newName, number: newNumber })
          .then(() => {
            personService.getAll().then(initialPeople => setPeople(initialPeople));
            notification(`Changed ${newNumber} is phonenumber of ${newNumber}`);
            setSuccess(true);
          })
          .catch(() => {
            notification(`infomation of ${newName} has already been removed from server`);
            setSuccess(false);
          });
      }
    };

    people.find(item => item.name === newName)
      ? putPhonenumber(people[people.findIndex(item => item.name === newName)].id)
      : personService
          .create(newPersonObject)
          .then(initialPeople => {
            setPeople(people.concat(initialPeople));
            notification(`Added ${newName}`);
            setSuccess(true);
          })
          .catch(error => {
            console.log(error.response.data);
          });

    setNewName('');
    setNewNumber('');
  };

  const deletePhonebook = (id: number) => {
    personService
      .delete(id)
      .then(() => personService.getAll().then(initialPeople => setPeople(initialPeople)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSuccess={isSuccess} />
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
      <People people={people} filterName={filterName} onClick={deletePhonebook} />
    </div>
  );
};

export default Phonebook;
