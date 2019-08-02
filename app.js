(async () => {
    const express = require('express');
    const expressGraphql = require('express-graphql');
    const Server = require('http').Server;
    const router = express.Router();
    const bodyParser = require('body-parser');
    const graphQLSchema = require('./graphql/schema');
    const dbManager = require('./db/db');

    try {
        let app = express();
        app.server = Server(app);
    
        app.services = app.services || {};
    
        let db = new dbManager();
        app.services.db = await db.start();

        app.use(bodyParser.urlencoded({
            extended: true
          }));
        app.use(bodyParser.json());
    
        // Here we shall create a pretty simple REST endpoint using express.
        let restController = require('./rest/restController')(app);
        app.use('/rest', restController.setupRoutes(router));
    
        // Below we shall define our graphQL endpoint.
        let schema = graphQLSchema(app);

        app.use('/graphql', expressGraphql({
                schema: schema,
                context: app.services,
                graphiql: true
            })
        );

        app.server.listen(3000);
        console.log('Server listening at:', 3000);

    } catch(err) {
        console.error(err);
    }
})();
