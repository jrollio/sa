import fastifyPlugin from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';

async function dbConnector ( fastify, options ){
    fastify.register(fastifyMongo, {
        url: process.env.MONGODB_URI || 'mongodb://black:27017/sadb'
    });
}

export default fastifyPlugin(dbConnector);