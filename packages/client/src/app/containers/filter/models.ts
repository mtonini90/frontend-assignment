export type FilterProps = {
    onChange: (filters: FilterObject) => void;
    onReset: () => void;
};

export interface FilterObject {
    types: Array<string>;
}

export type PokemonTypesResponse = {
    getPokemonTypes: {
        types: Array<string>;
    };
};
