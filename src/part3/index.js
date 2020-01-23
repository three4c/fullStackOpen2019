const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
  return maxId + 1;
};

app.use(bodyParser.json());

app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `);
});

app.get('/persons', (request, response) => {
  response.json(persons);
});

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.post('/persons', (request, response) => {
  const body = request.body;

  const format = `:method :url - :status - :response-time ms ${request.body}`;
  app.use(morgan(format));

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  if (persons.find(item => item.name === body.name).length !== 0) {
    console.log(persons.find(item => item.name === body.name));
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);
  console.log('B', persons);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
