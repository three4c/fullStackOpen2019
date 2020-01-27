const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://fullstackopen2019:abokado0514@cluster0-ptyni.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  collection.insertMany([{ name: '花子' }, { name: '一郎' }]);
  client.close();
});
