import Fastify from 'fastify';
import dbConnector from './config/connection.js';
import routes from './routes/api/page-routes.js';
/**
 * 
 */
const fastify = Fastify({ logger: true });

fastify.register( dbConnector );
fastify.register( routes );

fastify.listen({ port: 3030 }, function (err, address){
    if ( err ) {
        fastify.log.error(err)
        process.exit(1);
    }
})