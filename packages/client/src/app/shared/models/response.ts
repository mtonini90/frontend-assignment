import {Connection, Pokemon} from '@frontend-assignment/shared';

export type PokemonsResponse = {
    pokemons: Connection<Pokemon>;
};

export interface PokemonsVariables {
    filters: Filters;
    after?: string;
    limit?: number;
}

export interface Filters {
    q: string;
    types: Array<string>;
}
