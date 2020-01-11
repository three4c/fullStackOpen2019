import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

const PhonebookServer: FC = () => {
  const [countries, setCountries] = useState([
    { name: '', capital: '', population: 0, languages: [{ name: '' }], flag: '' }
  ]);
  const [isShow, setShow] = useState([false]);
  const [countriesFilter, setCountriesFilter] = useState([
    { name: '', capital: '', population: 0, languages: [{ name: '' }], flag: '' }
  ]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
      setCountriesFilter(response.data);
    });
  }, []);

  const filterHandler = (event: any) => {
    console.log(event.target.value);
    setCountriesFilter(
      countries.filter(
        item => item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      )
    );
  };

  const editHandler = (index: number) => {
    const newArray = [...isShow];
    newArray[index] = true;
    setShow(newArray);
  };

  const saveHandler = (index: number) => {
    const newArray = [...isShow];
    newArray[index] = false;
    setShow(newArray);
  };

  const changeHandler = (event: any, index: number) => {
    const newArray = [...countriesFilter];
    newArray[index].name = event.target.value;
    setCountriesFilter(newArray);
  };

  console.log(countriesFilter);

  return (
    <div>
      <p>
        find countries <input onChange={event => filterHandler(event)} />
      </p>
      {countriesFilter.length < 10 ? (
        countriesFilter.map((item, index) =>
          countriesFilter.length !== 1 ? (
            <div key={index}>
              {isShow[index] ? (
                <input value={item.name} onChange={event => changeHandler(event, index)} />
              ) : (
                item.name
              )}
              <button onClick={() => (isShow[index] ? saveHandler(index) : editHandler(index))}>
                {isShow[index] ? 'save' : 'edit'}
              </button>
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
