import Fastify from 'fastify';
import defaultRoute from './routes/default';
/**
 * 
 */
const fastify = Fastify({ logger: true });

fastify.register(defaultRoute);

fastify.listen({ port: 3030 }, function (err, address){
    if(err) {
        fastify.log.error(err)
        process.exit(1);
    }
})