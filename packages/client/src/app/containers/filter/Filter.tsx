import React, {useState} from 'react';
import {Button, Row, Col, Checkbox} from 'antd';
import {useQuery} from '@apollo/client';
import {PokemonTypesResponse} from './models';
import {GET_POKEMON_TYPES} from '../../shared/queries/pokemon';
import {FilterObject, FilterProps} from './models';

export const Filter: React.FC<FilterProps> = ({onChange, onReset}) => {
    const {data} = useQuery<PokemonTypesResponse>(GET_POKEMON_TYPES);
    /**
     * state is an object to be able to extend the section with other filters
     */
    const [filters, setFilters] = useState<FilterObject>({types: []});

    const handleChange = (types: Array<string>) => {
        setFilters({types});
        onChange({types});
    };

    const reset = () => {
        setFilters({types: []});
        onChange({types: []});
        onReset();
    };

    return (
        <>
            {data && data.getPokemonTypes && (
                <>
                    {data.getPokemonTypes.types && (
                        <Row justify="center">
                            <Col style={{margin: '2em 0'}}>
                                <span>FILTRA PER TIPOLOGIA</span>
                            </Col>
                            <Col>
                                <Checkbox.Group
                                    options={data.getPokemonTypes.types}
                                    value={filters.types}
                                    onChange={(types) =>
                                        handleChange(types as Array<string>)
                                    }
                                />
                            </Col>
                        </Row>
                    )}

                    <Row justify="center" style={{marginTop: '2em'}}>
                        <Col span={4}>
                            <Button
                                disabled={!filters.types.length}
                                danger
                                type="primary"
                                onClick={reset}>
                                RIMUOVI FILTRI
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};
