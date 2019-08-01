'use strict'

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userModel = require('./models/user')();

// List your collection names here
const COLLECTIONS = [];

class DBManager {
  constructor() {
    this.db = null;
    this.server = new MongoMemoryServer();
    this.connection = null;
  }

  async start() {
    const url = await this.server.getConnectionString();
    this.connection = await mongoose.connect(url, {});
    await this.insertMockData();
    return this.connection;
  }

  stop() {
    this.connection.close();
    return this.server.stop();
  }

  cleanup() {
    return Promise.all(COLLECTIONS.map(c => this.db.collection(c).remove({})));
  }

  async insertMockData() {
      let johnId = mongoose.Types.ObjectId();
      let aliceId = mongoose.Types.ObjectId();
      let bobId = mongoose.Types.ObjectId();

      await this.connection.models.User.insertMany([
          {
              '_id': johnId,
              'name': 'John',
              'age': 41,
              'posts': [
                  {
                      'title': 'New post',
                      'content': 'My name is John'
                  }
              ],
              'followers': [aliceId]
          },
          {
            '_id': aliceId,
            'name': 'Alice',
            'age': 26,
            'posts': [
                {
                    'title': 'My First Blog post',
                    'content': 'Hi !'
                }
            ],
            'followers': [johnId, bobId]
        },
        {
            '_id': bobId,
            'name': 'Bob',
            'age': 95,
            'posts': [
                {
                    'title': 'Bob GraphQL Journey',
                    'content': 'We travel from beginer to master on this journey',
                    'comments': [{
                        'user': aliceId,
                        'comment': 'Great article Bob !'
                    }]
                },
                {
                    'title': 'REST is dead !',
                    'content': 'Long live REST'
                }
            ],
            'followers': [johnId, aliceId]
        }
      ]);
  }
}

module.exports = DBManager;