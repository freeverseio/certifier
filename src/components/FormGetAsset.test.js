import { render, screen, fireEvent } from '@testing-library/react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import FormGetAsset from './FormGetAsset';
const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

describe('FormGetAsset', () => {

    test('should have a form with a field for assetId', () => {
        render(<ApolloProvider client={client}><FormGetAsset /></ApolloProvider>);
        const input = screen.getByTestId('assetId');
        expect(input).toBeInTheDocument();
    });

})