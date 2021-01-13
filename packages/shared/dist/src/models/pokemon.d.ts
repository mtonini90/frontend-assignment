export interface Pokemon extends Partial<Countries>, Partial<Rarity> {
    id: string;
    name: string;
    classification: string;
    types: Array<string>;
    resistant: Array<string>;
    weaknesses: Array<string>;
    weight: PokemonWeight;
    height: PokemonHeight;
    fleeRate: number;
    maxCP: number;
    maxHP: number;
    attacks: {
        fast: Array<Partial<AttackFeatures>>;
        special: Array<AttackFeatures>;
    };
    'Previous evolution(s)'?: Array<PokemonEvolution>;
    evolutionRequirements?: PokemonEvolotionRequirements;
    evolutions?: Array<PokemonEvolution>;
    'Pokémon Class'?: string;
}
declare type CountriesName = 'Australia, New Zealand' | 'Western Europe' | 'Common Capture Area' | 'Asia' | 'North America';
declare type Countries = {
    [k in CountriesName]: string;
};
declare type RarityLevel = 'LEGENDARY' | 'MYTHIC';
declare type Rarity = {
    [k in RarityLevel]: string;
};
interface PokemonWeight {
    minimum: string;
    maximum: string;
}
interface PokemonHeight {
    minimum: string;
    maximum: string;
}
interface PokemonEvolotionRequirements {
    amount: number;
    name: string;
}
interface PokemonEvolution {
    id: number;
    name: string;
}
interface AttackFeatures {
    name: string;
    type: string;
    damage: number;
}
export interface Edge<A> {
    cursor: string;
    node: A;
}
export interface PageInfo {
    endCursor?: string;
    hasNextPage: boolean;
}
export interface Connection<A> {
    edges: Array<Edge<A>>;
    pageInfo: PageInfo;
}
export {};
