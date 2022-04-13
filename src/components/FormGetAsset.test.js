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

    test('should have a form with a email field', () => {
        render(<ApolloProvider client={client}><FormGetAsset/></ApolloProvider>);
        const input = screen.getByTestId('email');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'email');
        fireEvent.change(input, { target: { value: 'email@gmail.com' } })
        expect(input).toHaveValue('email@gmail.com');
    });

    test('should have a form with a PASSWORD field', () => {
        render(<ApolloProvider client={client}><FormGetAsset/></ApolloProvider>);
        const input = screen.getByTestId('password');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'password');
    });

    test('should have a button with a “Get your free NFT” text', () => {
        render(<ApolloProvider client={client}><FormGetAsset/></ApolloProvider>);
        const input = screen.getByTestId('get-button');
        expect(input).toBeInTheDocument();
        expect(input).toHaveTextContent('Get your free NFT');
        
    });

    test('should have a text field that displays wallet adress and private key after clicking the button', () => {
        const utils = render(<ApolloProvider client={client}><FormGetAsset/></ApolloProvider>);
        const button = screen.getByTestId('get-button');
        let emailTemplate = screen.getByTestId('email-template');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Get your free NFT');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        fireEvent.change(email, { target: { value: 'email@gmail.com' } });
        fireEvent.change(password, { target: { value: '1234' } });
        fireEvent.click(button);
        // check if it contains the address that should start with a 0x
        expect(emailTemplate.innerHTML.indexOf(': 0x')).toBeGreaterThanOrEqual(0);

    });

    test('should create an wallet address and private key when clicking the button', async () => {
        const utils = render(<ApolloProvider client={client}><FormGetAsset/></ApolloProvider>);
        const button = screen.getByTestId('get-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Get your free NFT');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        fireEvent.change(email, { target: { value: 'email@gmail.com' } });
        fireEvent.change(password, { target: { value: '1234' } });
        fireEvent.click(button);
        const seeNftButton = await screen.findByTestId('see-nft-button');
        expect(seeNftButton).toBeInTheDocument();
    });

    test('should show an error when backend returns an error', async () => {
        const utils = render(<ApolloProvider client={client}><FormGetAsset/></ApolloProvider>);
        const button = screen.getByTestId('get-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Get your free NFT');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        fireEvent.change(email, { target: { value: '123456' } });
        fireEvent.change(password, { target: { value: '1234' } });
        // when we send the form with an email 123456  the mockserver returns an error
        fireEvent.click(button);
        const errorMessage = await screen.findByTestId('error-message');
        expect(errorMessage).toBeInTheDocument();
    });

    test('should have a toggle button that shows and hides the textfield', () => {
        const utils = render(<ApolloProvider client={client}><FormGetAsset/></ApolloProvider>);
        let collapseButton = screen.getByTestId('collapse-button');
        let emailTemplate = screen.getByTestId('email-template');
        
        expect(collapseButton).toBeInTheDocument();
        expect(emailTemplate).toBeInTheDocument();
        fireEvent.click(collapseButton);
        // hide textarea
        expect(emailTemplate).not.toBeInTheDocument();
        expect(collapseButton).not.toBeInTheDocument();
        const expandButton = screen.getByTestId('expand-button');
        expect(expandButton).toBeInTheDocument();

        fireEvent.click(expandButton);
        collapseButton = screen.getByTestId('collapse-button');
        emailTemplate = screen.getByTestId('email-template');
      
        expect(collapseButton).toBeInTheDocument();
        expect(emailTemplate).toBeInTheDocument();
    });

})