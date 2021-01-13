import * as fs from 'fs';
import {ApolloServer, gql} from 'apollo-server';

import {resolvers} from './src/models/pokemons/resolvers';

const schema = fs.readFileSync('./src/graphql/schema.graphql', 'utf8');

const typeDefs = gql(schema);

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});
