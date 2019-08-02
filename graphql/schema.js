'use strict'

const { buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools')

module.exports = create;

function create() {
    let typeDefs =`
        type Query {
            # Query user by their name
            user(name: String!): User!
            # Query all users in database
            allUsers(last: Int): [User!]!
        }

        type Mutation {
            # Create a new user in database
            createUser(name: String!, age: Int!): User!
        }

        ## User Schema
        type User {
            # Full name of the user
            name: String!
            # Exact age of user
            age: Int!
            # A list of posts the user has generated
            posts: [Post!]!
            # A list of followers the user has
            followers: [User!]
        }

        ## Post Schema
        type Post {
            # Title of post
            title: String!
            # Content body of the post
            content: String!
            # A list of comments on the post
            comments: [Comments]
        }

        ## Comments Schema
        type Comments {
            # The ID of user who made the comment
            user: ID!
            # Comment text
            comment: String!
        }
    `;

    /**
     * Each of our resolver functions can take in 4 parameters:
     * #parent : Also known as 'root' 
     * #args : Is your inputs which you register in your typeDefs
     * #context : Something that can be passed to every resolver i.e. the request and response
     * #info : 
     *  */ 


    let resolvers = {
        Query: {
            user: async (parent, { name }, context, info) => {
                return await context.db.models.User.findOne({name: name}).lean().populate('followers').exec();
            },
            allUsers: async (parent, args, context, info) => {
                return await context.db.models.User.find({}).lean().exec();
            }
        },
        Mutation: {
            createUser: async (parent, { name, age }, context, info) => {
                return await context.db.models.User.create({name, age});
            }
        }
    }

    return makeExecutableSchema({typeDefs, resolvers});
}
