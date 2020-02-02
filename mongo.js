const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen2019:${password}@cluster0-ptyni.mongodb.net/phonenumber-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('person', personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
});

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then(response => {
    console.log('person saved!');
    mongoose.connection.close();
  });
}
