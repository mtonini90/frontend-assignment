import {ApolloClient, ApolloProvider} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {cache} from './cache';

export const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache,
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
