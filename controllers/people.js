const peopleRouter = require('express').Router();
const Person = require('../models/person');

peopleRouter.get('/', (_, response) => {
  Person.find({}).then(people => {
    response.json(people.map(person => person.toJSON()));
  });
});

peopleRouter.post('/', (request, response, next) => {
  const body = request.body;

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

peopleRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      person ? response.json(person.toJSON()) : response.status(404).end();
    })
    .catch(error => next(error));
});

peopleRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

peopleRouter.put('/:id', (request, response, next) => {
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

module.exports = peopleRouter;
