import {Pokemon} from '@frontend-assignment/shared';

export type PokemonModelProps = {
    args: PokemonArgs;
    filtersBy: FilterBy;
};

export type PokemonArgs = {
    after?: string;
    limit?: number;
    filters?: Filters;
};

export type Filters = {
    q: string;
    types: Array<string>;
};

export type FilterBy = Array<(_: Partial<Filters>) => (p: Pokemon) => boolean>;
