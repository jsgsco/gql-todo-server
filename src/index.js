import { ApolloServer } from 'apollo-server';
import typeDefs from './db/schema';
import resolvers from './db/resolvers';
import connectDB from './config/db';
import jwt from 'jsonwebtoken';
require('dotenv').config( { path: '.env' } );

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers['authorization'] || ''
        if(token) {
            try {
                const user = jwt.verify(token, process.env.SECRET)
                return {
                    user
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
});

server.listen().then( ({url}) => {
    console.log(`${url}`)
} );