
import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLazyQuery } from '@apollo/client';
import { GET_ASSET_PROPS, GET_CURRENT_VERSE } from '../graphql/mutations/asset';
import Loading from './Loading';
import AssetDataTemplate from './AssetDataTemplate';
import ErrorDisplay from './ErrorDisplay';

import { splitStrByTrait, encode, universeIdFromAssetId } from '../utils/jsonUtils';


function FormGetAsset() {

    const [universeVerse, setUniverseVerse] = useState('');
    const [assetId, setAssetId] = useState('');
    const [universeId, setUniverseId] = useState('0');
    const [assetDataTemplate, setAssetDataTemplate] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
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

    
    // variables: { assetId: '655676227982332778968688736442226131714727085092', universeVerse: 3 },

    const showData = (data) => {
        const props = data?.propByAssetIdAndUniverseVerse;
        if (props) {
            setError('');
            const full = props.props;
            const spl =  splitStrByTrait(full, 'Charisma', 10);
            const encoded = encode(spl.preStr, spl.postStr, props.cid, props.proof);
            const text = full + ' ' + spl.preStr + ' ' + spl.postStr + ' ' + props.cid + ' ' + props.proof + ' ' + encoded;
            // const text = universeIdFromAssetId(assetId);
            setAssetDataTemplate(text);
        } else {
            setError('No data found for this asset');
            setAssetDataTemplate('');
        }
    }

    const showVerse = (data) => {
        setAssetDataTemplate(data.universeCurrentVerse);
        return;
    }


    const [loadAsset, { isLoading }] = useLazyQuery(GET_ASSET_PROPS, {
        onError: (e) => setError(e.message),
        onCompleted: showData,
    });

    const [getCurrentVerse, { isVerseLoading }] = useLazyQuery(GET_CURRENT_VERSE, {
        onError: (e) => setError(e.message),
        onCompleted: showVerse,
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

            <Button variant="primary" disabled={buttonDisabled} type="button" onClick={() => loadAsset({variables: { assetId: assetId.toString(), universeVerse: Number(universeVerse) }})} data-testid="get-button">
                Get Asset Data
            </Button>
            <Button variant="primary" disabled={buttonDisabled} type="button" onClick={() => getCurrentVerse({variables: { universeId: "0".toString() }})} data-testid="get-button">
                Get Universe
            </Button>

            {isLoading && <Loading />}
            {error && <ErrorDisplay errorText={error} onCloseFunct={closeErrorMessage} />}
            {assetDataTemplate !== '' && <AssetDataTemplate assetDataTemplateValue={assetDataTemplate} />}
        </Form>
    );
}

export default FormGetAsset;