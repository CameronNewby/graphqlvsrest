You can install and start up the Node app with the following commands.

npm install && npm run start

This will start up the application locally on port 3000. You can use GraphQL query interface by going to '/graphql' route from here you can make queries like so.

query {
  user(name: "Bob") {
    name,
    age,
    posts {
      title
    },
    followers {
      name
    }
  }
}

Included in this project is a 'Postman' JSON collection of all the queries you can make on the REST and GraphQL endpoints.
