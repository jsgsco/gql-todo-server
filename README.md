# GraphQL Server
This server is a short GraphQL practice is done in order to create a full stack application implementing React.js

## Avadible Scripts
to start clone the proyect and use: 
```
yarn or you can also use npm install
```
To start the server in your browser:
```
yarn dev or npm run dev
```

## What does this server have?
* Apollo-Server
* GraphQL
* MongoDB

### Schema Completed
```gql
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
  getUser(token: String!): User
  getTasksUser: [Task]
  getTask(id: ID!): Task
}

type Mutation {
  createUser(input: UserInput): User
  authenticateUser(input: AuthenticateInput): Token
  deleteUser(id: ID!): String
  createTask(input: TaskInput): Task
  updateTask(id: ID!, input: TaskInput): Task
  deleteTask(id: ID!): String
}
```
I leave it to open source so that you can practice, it is mandatory to configure the environment variables of the database

## License
This project is licensed [MIT licensed](./LICENSE)