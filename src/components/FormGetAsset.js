
import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLazyQuery } from '@apollo/client';
import { GET_INFO } from '../graphql/mutations/asset';
import Loading from './Loading';
import AssetDataTemplate from './AssetDataTemplate';
import ErrorDisplay from './ErrorDisplay';



function FormGetAsset() {

    const [universeVerse, setUniverseVerse] = useState('');
    const [assetId, setAssetId] = useState('');
    const [assetDataTemplate, setAssetDataTemplate] = useState('');
    const [nft, setNft] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const closeErrorMessage = () => {
        setError(null);
    }

    useEffect(() => {
        if (assetId !== '' && universeVerse !== '') {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [assetId, universeVerse]);

    
    // variables: { assetId: '655676227982332778968688736442226131714727085092', universeVerse: 2 },

    const showData = (data) => {
        const props = data?.propByAssetIdAndUniverseVerse;
        if (props) {
            setError('');
            setAssetDataTemplate(props.props);
        } else {
            setError('No data found for this asset');
            setAssetDataTemplate('');
        }
    }

    const [loadAsset, { called, loading }] = useLazyQuery(GET_INFO, {
        variables: { assetId: assetId.toString(), universeVerse: 2 },
        onError: (e) => setError(e.message),
        onCompleted: showData,
    });

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control required type="assetId" placeholder="Enter AssetId" data-testid="assetId"
                    onChange={(e) => {
                        setAssetId(e.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control required type="universeVerse" placeholder="Enter Universe Idx" data-testid="universeVerse"
                    onChange={(e) => {
                        setUniverseVerse(e.target.value);
                    }} />
            </Form.Group>

            <Button variant="primary" disabled={buttonDisabled} type="button" onClick={() => loadAsset()} data-testid="get-button">
                Get Asset Data
            </Button>

            {isLoading && <Loading />}
            {error && <ErrorDisplay errorText={error} onCloseFunct={closeErrorMessage} />}
            {assetDataTemplate !== '' && <AssetDataTemplate assetDataTemplateValue={assetDataTemplate} />}
        </Form>
    );
}

export default FormGetAsset;