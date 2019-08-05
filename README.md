You can install and start up the Node app with the following commands.
```javascript
npm install && npm run start
```

This will start up the application locally on port `3000`. You can use GraphQL query interface by going to '/graphql' route from here you can make queries like so.

```javascript
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
```

Included in this project is a 'Postman' JSON collection of all the queries you can make on the REST and GraphQL endpoints.

All the REST request should be made on '/rest' route, below are examples of the request you can make.

* `getUser` 'GET' /rest/user?name=$name
* `getAllUsers` 'GET' /rest/user/all
* `getUsersPost` 'GET' /rest/user/:name/posts
* `getUsersFollowers` 'GET' /rest/user/:name/followers
* `createUser` 'POST' /rest/user/create
