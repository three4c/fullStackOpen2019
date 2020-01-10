import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhonebookServer = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('promise fulfilled');
      setCountries(response.data);
    });
    console.log(countries);
  }, []);
  console.log(countries);
  return (
    <div>
      <p>
        find countries <input />
      </p>
      <p>Too many matches, specify another filter</p>
    </div>
  );
};

export default PhonebookServer;
