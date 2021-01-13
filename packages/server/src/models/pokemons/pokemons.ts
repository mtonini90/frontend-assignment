import {pipe} from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';
import {ord, ordString} from 'fp-ts/lib/Ord';
import {eqString} from 'fp-ts/lib/Eq';
import {identity} from 'fp-ts/lib/function';
import {data} from '../../data/pokemons';
import {toConnection, slice} from './functions';
import {Connection, Pokemon} from '@frontend-assignment/shared';
import {FilterBy, PokemonArgs} from './models';
import {compose} from '../../utils/functions';

const SIZE = 10;

export function query(
    args: PokemonArgs,
    filtersBy: FilterBy,
): Connection<Pokemon> {
    const {after, filters = {}, limit = SIZE} = args;

    const filterFns = filtersBy.map((fn) => A.filter(fn(filters)));

    const composedFilter = filterFns.length
        ? compose<Array<Pokemon>>(...filterFns)
        : identity;

    const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
        // filter only if q is defined
        after === undefined
            ? identity
            : (as) =>
                  pipe(
                      as,
                      A.findIndex((a) => a.id === after),
                      O.map((a) => a + 1),
                      O.fold(
                          () => as,
                          (idx) => as.slice(idx),
                      ),
                  );

    const results: Pokemon[] = pipe(
        data,
        composedFilter,
        sliceByAfter,
        // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
        slice(0, limit + 1),
    );
    return toConnection(results, limit);
}

export function getPokemonTypes() {
    const byType = ord.contramap(ordString, (n: string) => n);
    const typesArray: Array<Array<string>> = pipe(
        data,
        A.filter((p) => Array.isArray(p.types)),
        A.map((p) => p.types),
    );

    const types = pipe(A.flatten(typesArray), A.uniq(eqString), A.sort(byType));

    return {types};
}
