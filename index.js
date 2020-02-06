require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const Person = require('./models/person');

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

/** mongoDB */
app.get('/api/people', (request, response) => {
  Person.find({}).then(person => {
    response.json(person);
  });
});

app.post(`/api/people`, (request, response, next) => {
  const body = request.body;

  const format = `:method :url - :status - :response-time ms ${request.body}`;
  app.use(morgan(format));

  Person.find({}).then(person => {
    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'content missing'
      });
    } else if (person.filter(item => item.name === body.name).length !== 0) {
      return response.status(400).json({
        error: 'name must be unique'
      });
    } else {
      const person = new Person({
        name: body.name,
        number: body.number
      });

      person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedNote => {
          response.json(savedAndFormattedNote);
        })
        .catch(error => next(error));
    }
  });
});

app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      person ? response.json(person.toJSON()) : response.status(404).end();
    })
    .catch(error => next(error));
});

app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/people/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
