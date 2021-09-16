const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID
        name: String
        lastname: String
        email: String
    }

    type Token {
        token: String
    }

    type Task {
        id: ID
        name: String
        task: String
        by: ID
    }

    input UserInput {
        name: String!
        lastname: String!
        email: String!
        password: String!
    }

    input TaskInput {
        name: String!
        task: String!
    }

    input AuthenticateInput {
        email: String!
        password: String!
    }

    type Query {
        # User
        getUser(token: String!): User

        #Task
        getTasksUser: [Task]
        getTask(id: ID!): Task
    }

    type Mutation {
        # User
        createUser(input: UserInput): User
        authenticateUser(input: AuthenticateInput): Token
        deleteUser(id: ID!): String

        # Task
        createTask(input: TaskInput): Task
        updateTask(id: ID!, input: TaskInput): Task
        deleteTask(id: ID!): String
    }
`

module.exports = typeDefs;