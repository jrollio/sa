// page-routes.js
import Schema from '../../models/index.js';
/**
 * 
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance 
 * @param {Object} options plugin options
 */
async function routes (fastify, options) {
    const collection = fastify.mongo.db.collection('pages');

    fastify.get('/', async ( request, reply ) => {
        return { hello: 'world' }
    });

    fastify.get('/pages', async ( request, reply ) => {
        const result = await collection.find().toArray()
        if ( result.length < 1 ) {
            throw new Error ( 'No documents found' )
        }
        return result;
    });

    fastify.get('/pages/:ref', async ( request, reply ) => {
        
        const result = await collection.findOne({ page: request.params.ref });

        if ( !result ) {
            throw new Error ( 'Invalid value' )
        }

        return result;
    });

    fastify.post('/pages', { Schema }, async ( request, reply ) => {
        
        const result = await collection.insertOne({ page: request.body.page });

        if ( !result ) {
            throw new Error ( 'Insert page failed during insert' );
        }

        return result;
    });

}

export default routes;