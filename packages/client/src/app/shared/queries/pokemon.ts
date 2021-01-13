import {gql} from '@apollo/client';

export const GET_POKEMON = gql`
    query($filters: Filters!, $after: ID, $limit: Int) {
        pokemons(filters: $filters, after: $after, limit: $limit) {
            edges {
                cursor
                node {
                    id
                    types
                    name
                    classification
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;
export const GET_POKEMON_TYPES = gql`
    query {
        getPokemonTypes {
            types
        }
    }
`;
