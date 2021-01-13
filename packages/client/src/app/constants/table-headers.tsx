import React from 'react';

export const POKEMON_TABLE_COLUMNS = [
    {
        title: 'Classificazione',
        dataIndex: 'classification',
        key: 'id',
    },
    {
        title: 'Nome',
        dataIndex: 'name',
    },
    {
        title: 'Tipologie',
        dataIndex: 'types',
        key: 'id',
        render: (types: string[]) => (
            <>
                {types.map((type, i) => (
                    <div key={i}>{type}</div>
                ))}
            </>
        ),
    },
];
