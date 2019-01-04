import '@babel/polyfill/noConflict';
import {GraphQLServer, PubSub} from 'graphql-yoga';
import db from './db';
import prisma from './prisma'
import {resolvers, fragmentReplacements} from './resolvers/index';

const PORT = process.env.PORT || 4000;
const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    fragmentReplacements,
    context(request){
        return {
            db,
            pubsub,
            prisma,
            request
        };
    }
});

server.start({port: PORT}, () => console.log('The server is up'));