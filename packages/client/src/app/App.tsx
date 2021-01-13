import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {Button, Col, Row, Table, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import {GET_POKEMON} from './shared/queries/pokemon';
import {POKEMON_TABLE_COLUMNS} from './constants/table-headers';
import {
    Filters,
    PokemonsResponse,
    PokemonsVariables,
} from './shared/models/response';
import {Pokemon} from '@frontend-assignment/shared';
import {Filter} from './containers/filter/Filter';

const style = {margin: '2em 0'};

const App: React.FC = () => {
    const [setPokeoms, {loading, error, data, fetchMore}] = useLazyQuery<
        PokemonsResponse,
        PokemonsVariables
    >(GET_POKEMON, {
        variables: {filters: {q: '', types: []}},
        fetchPolicy: 'cache-and-network',
    });

    const [filters, setFilters] = useState<Filters>({q: '', types: []});

    const handleSearch = (q: string) => {
        const current = {...filters, q};
        setFilters(current);
    };

    const searchByTypes = async (f: {types: Array<string>}) => {
        const {types} = f;
        const t = types && types.length ? types : [];
        const current = {...filters, types: t};
        setFilters(current);
    };

    const handleFetchMore = async () => {
        const variables = {
            after: data?.pokemons.pageInfo.endCursor,
        };
        await fetchMore!({variables});
    };

    const reset = () => setFilters({...filters, types: []});

    useEffect(() => {
        setPokeoms({
            variables: {filters: filters},
        });
    }, [filters]);

    const dataSet: Array<Partial<Pokemon>> =
        data && data.pokemons ? data.pokemons.edges.map((e) => e.node) : [];

    if (error) return <div>ERROR</div>;
    return (
        <Row justify="center">
            <Col flex={'75%'}>
                <Row style={style}>
                    <Col>
                        <h1 style={{textAlign: 'center'}}>
                            SCRIVI IL NOME DI UN POK&Eacute;MON PER EFFETTUARE
                            UNA RICERCA
                        </h1>
                    </Col>
                </Row>

                <Row justify="center" style={style}>
                    <Col span={24}>
                        <Form
                            name="search-form"
                            onFinish={({search}) => handleSearch(search)}>
                            <Form.Item name="search">
                                <Input.Search
                                    placeholder="input search text"
                                    enterButton="Search"
                                    size="large"
                                    onSearch={handleSearch}
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col style={style}>
                        <Filter onChange={searchByTypes} onReset={reset} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table<Partial<Pokemon>>
                            loading={loading}
                            dataSource={dataSet}
                            columns={POKEMON_TABLE_COLUMNS}
                            pagination={false}
                            sticky={true}
                            rowKey="id"
                        />
                    </Col>
                </Row>

                <Row justify="center" style={style}>
                    <Col>
                        <Button
                            type="primary"
                            disabled={
                                !(data && data.pokemons.pageInfo.hasNextPage)
                            }
                            onClick={handleFetchMore}>
                            CARICA ALTRI POKEMON
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default App;
