import React, { useState } from 'react';

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

    console.log(newPeersonObject);

    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown width <input onChange={e => setFilterName(e.target.value)} />
      </div>
      <h3>add a new</h3>
      <form onSubmit={addPhonebook}>
        <div>
          <div>
            name: <input onChange={e => setNewName(e.target.value)} value={newName} />
          </div>
          <div>
            number: <input onChange={e => setNewNumber(e.target.value)} value={newNumber} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter(item => item.name === filterName && filterName)
          .map((item, index) => (
            <li key={index}>
              {item.name} {item.number}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Phonebook;
