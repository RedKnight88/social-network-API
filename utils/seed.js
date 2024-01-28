const connection = require('../config/connection');
const { Thought, User, Reaction } = require('../models')
const data = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }
    
    await User.collection.insertMany(data.users)

    process.exit(0);
});