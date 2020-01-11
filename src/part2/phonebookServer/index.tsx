import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

const PhonebookServer: FC = () => {
  const [countries, setCountries] = useState([
    { name: '', capital: '', population: 0, languages: [{ name: '' }], flag: '' }
  ]);
  const [filter, setFilter] = useState('');
  const [isShow, setShow] = useState([false]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const countriesFilter = countries.filter(item => item.name.toLowerCase().search(filter.toLowerCase()) !== -1);

  const filterHandler = (event: any) => {
    setFilter(event.target.value);
    // setShow(Array(countriesFilter.length).fill(false));
  };

  const editHandler = (index: number) => {
    const newArray = [...isShow];
    newArray[index] = true;
    setShow(newArray);
    console.log(isShow);
  };

  return (
    <div>
      <p>
        find countries <input onChange={event => filterHandler(event)} />
      </p>
      {countriesFilter.length < 10 ? (
        countriesFilter.map((item, index) =>
          countriesFilter.length !== 1 ? (
            <div key={index}>
              {item.name} <button onClick={() => editHandler(index)}>{isShow ? 'edit' : 'show'}</button>
            </div>
          ) : (
            <div key={index}>
              <h1>{item.name}</h1>
              <p>capital {item.capital}</p>
              <p>population {item.population}</p>
              <div>
                <h2>languages</h2>
                <ul>
                  {item.languages.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </div>
              <img src={item.flag} alt={item.name} width="200px" />
            </div>
          )
        )
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default PhonebookServer;
