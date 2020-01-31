require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const Person = require('./models/person');

let people = [
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
  const maxId = people.length > 0 ? Math.max(...people.map(n => n.id)) : 0;
  return maxId + 1;
};

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${people.length} people</p>
  <p>${new Date()}</p>
  `);
});

app.get('/people', (request, response) => {
  response.json(people);
});

app.get('/people/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = people.find(person => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.get('/api/people', (request, response) => {
  Person.find({}).then(person => {
    response.json(person);
  });
});

app.delete('/people/:id', (request, response) => {
  const id = Number(request.params.id);
  people = people.filter(person => person.id !== id);

  response.status(204).end();
});

app.post('/people', (request, response) => {
  const body = request.body;

  const format = `:method :url - :status - :response-time ms ${request.body}`;
  app.use(morgan(format));

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  if (people.filter(item => item.name === body.name).length !== 0) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  people = people.concat(person);
  response.json(person);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
