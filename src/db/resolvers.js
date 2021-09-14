import User from "../models/User";
import Task from '../models/Task'
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
require('dotenv').config( { path: '.env' } );

const createToken = (user, key, expiresIn) => {
    const { id, email, name, lastname } = user;

    return jwt.sign( { id, email, name, lastname }, key, { expiresIn } );
};

const resolvers = {
    Query: {
        getUser: async (_, { token }) => {
            const userId = jwt.verify(token, process.env.SECRET);
            return userId;
        },
        getTasksUser: async (_, {}, ctx) => {
            const tasks = await Task.find({ by: ctx.user.id.toString() });
            return tasks;
        },
        getTask: async (_, { id }, ctx) => {
            const task = await Task.findById(id);

            if(!task) {
                throw new Error('Task not found');
            }

            if(task.by.toString() !== ctx.user.id) {
                throw new Error('You dont have the credentials');
            }

            return task;
        }
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const { email, password } = input;
            
            const userExists = await User.findOne( {email} );
            if (userExists) {
                throw new Error('User already exists');
            }

            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                const user = new User(input);
                user.save();
                return user;
            } catch (error) {
                console.log(error);
            }
            
        },
        authenticateUser: async (_, { input }) => {
            const { email, password } = input;

            const userExists = await User.findOne( {email} );
            if (!userExists) {
                throw new Error('Username does not exist');
            }

            const passwordExact = await bcryptjs.compare(password, userExists.password);
            if(!passwordExact) {
                throw new Error('Wrong password');
            }

            return {
                token: createToken(userExists, process.env.SECRET, '24h')
            }
        },
        deleteUser: async (_, { id }, ctx) => {
            let user = await User.findById(id);

            if(!user) {
                throw new Error('That user does not exist');
            }

            if(user._id.toString() !== ctx.user.id) {
                throw new Error('You dont have the credentials');
            }

            await User.findOneAndDelete({_id : id});
            return "User deleted";
        },
        createTask: async (_, { input }, ctx) => {
            const newTask = new Task(input);
            newTask.by = ctx.user.id;
            
            const result = await newTask.save();
            return result;
        },
        updateTask: async (_, { id, input }, ctx) => {
            let task = await Task.findById(id);

            if(!task) {
                throw new Error('That task does not exist');
            }

            if (task.by.toString() !== ctx.user.id) {
                throw new Error('You dont have the credentials');
            }

            task = await Task.findOneAndUpdate({ _id: id }, input, { new: true });
            return task;
        },
        deleteTask: async (_, { id }, ctx) => {
            let task = await Task.findById(id);

            if(!task) {
                throw new Error('That task does not exist');
            }

            if(task.by.toString() !== ctx.user.id) {
                throw new Error('You dont have the credentials');
            }

            await Task.findOneAndDelete({_id : id});
            return "Task deleted";
        }
    }
};

export default resolvers;