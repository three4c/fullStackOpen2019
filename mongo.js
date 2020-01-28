// const MongoClient = require('mongodb').MongoClient;
// const uri =
//   'mongodb+srv://fullstackopen2019:abokado0514@cluster0-ptyni.mongodb.net/phonenumber-app?retryWrites=true&w=majority';
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db('phonenumber-app').collection('persons');
//   // perform actions on the collection object
//   collection.insertMany([{ name: '花子' }, { name: '一郎' }]);
//   client.close();
// });

const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen2019:${password}@cluster0-ptyni.mongodb.net/phonenumber-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true
});

note.save().then(response => {
  console.log('note saved!');
  mongoose.connection.close();
});
