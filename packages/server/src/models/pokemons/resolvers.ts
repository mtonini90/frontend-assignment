import {IResolvers} from 'graphql-tools';
import {filterByType, filterByName} from './functions';
import {PokemonArgs} from './models';
import * as pokemons from './pokemons';

/**
 * the second argument of pokemons.query is an array of function combined for filter pokemons
 */
export const resolvers: IResolvers = {
    Query: {
        pokemons: (_source, args: PokemonArgs) =>
            pokemons.query(args, [filterByName, filterByType]),
        getPokemonTypes: () => pokemons.getPokemonTypes(),
    },
};
