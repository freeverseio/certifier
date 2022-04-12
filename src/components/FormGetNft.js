
import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useQuery } from '@apollo/client';
import { GET_INFO } from '../graphql/mutations/asset';
import Loading from './Loading';
import EmailTemplate from './EmailTemplate';
import ErrorDisplay from './ErrorDisplay';



function createNewAccount() {};
function encryptIdentity() {};

function FormGetNft() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailTemplate, setEmailTemplate] = useState('Email template:');
    const [nft, setNft] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const closeErrorMessage = () => {
        setError(null);
    }

    useEffect(() => {
        if (email !== '' && password !== '') {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email, password]);

    const {
        data,
        loading,
        refetch,
    } = useQuery(GET_INFO, {
        variables: {
            assetId: '655676227982332778968688736442226131714727085092',
            universeVerse: 2,
        }
    });

    useEffect(() => {
        const props = data?.propByAssetIdAndUniverseVerse;
        console.log('data:');
        console.log(props);
        setEmailTemplate(props.props);
      }, [data]);
    

    const createNft = async () => {
        setIsLoading(true);
        // .then(data => {
        //         setIsLoading(false);
        //         setError(null);
        //         console.log(data);
        //         return data;
        //     }).catch(error => {
        //         setError(error.message);
        //         setIsLoading(false);
        //         return error.graphQLErrors;
        //     });
    }

    const seeNft = () => {
        window.location.href = 'https://market.staging.blackhole.gorengine.com/asset/' + nft;
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" data-testid="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" data-testid="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
            </Form.Group>

            <Button variant="primary" disabled={buttonDisabled} type="button" onClick={() => createNft()} data-testid="get-button">
                Get your free NFT
            </Button>

            {isLoading && <Loading />}
            {error && <ErrorDisplay errorText={error} onCloseFunct={closeErrorMessage} />}
            <EmailTemplate emailTemplateValue={emailTemplate} />
            {nft && <Button variant="primary" type="button" onClick={() => seeNft()} data-testid="see-nft-button">
                See my new NFT
            </Button>
            }

        </Form>
    );
}

export default FormGetNft;