
import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLazyQuery } from '@apollo/client';
import { GET_ASSET_PROPS, GET_CURRENT_VERSE } from '../graphql/mutations/asset';
import Loading from './Loading';
import InfoTemplate from './InfoTemplate';
import ErrorDisplay from './ErrorDisplay';

import { splitStrByTrait, encode, universeIdFromAssetId } from '../utils/jsonUtils';


function FormGetAsset() {

    const [universeVerse, setUniverseVerse] = useState('');
    const [assetId, setAssetId] = useState('');
    const [assetDataResult, setAssetDataResult] = useState(null);
    const [assetJson, setAssetJson] = useState('');
    const [traitType, setTraitType] = useState('');
    const [traitVal, setTraitVal] = useState('');
    const [traitValIsNumber, setTraitValIsNumber] = useState(true);
    const [assetJsonButtonDisabled, setAssetJsonButtonDisabled] = useState(true);
    const [proofButtonDisabled, setProofButtonDisabled] = useState(true);
    const [error, setError] = useState(null);


    const closeErrorMessage = () => {
        setError(null);
    }

    useEffect(() => {
        setAssetJsonButtonDisabled(assetId === '');
    }, [assetId]);

    useEffect(() => {
        setProofButtonDisabled(traitType === '' || traitVal === '');
    }, [traitType, traitVal]);


    useEffect(() => {
        if (assetId !== '' && universeVerse !== '') {
            loadAsset({variables: { assetId: assetId.toString(), universeVerse: Number(universeVerse) }})
        }
    }, [universeVerse]);
    
    // variables: { assetId: '655676227982332778968688736442226131714727085092', universeVerse: 3 },

    const buildProof = (_traitType, _traitVal, _isNumber, _props) => {
        const propsJson = String(_props.props);
        console.log(propsJson);
        console.log(_traitType);
        console.log(_traitVal);
        const val = _isNumber ? Number(_traitVal) : String(_traitVal);
        const propsSplit = splitStrByTrait(propsJson, String(_traitType), val);
        console.log(propsSplit);
        const encoded = encode(propsSplit.preStr, propsSplit.postStr, _props.cid, _props.proof);
        setAssetJson(encoded);
    }

    const showData = (data) => {
        const props = data?.propByAssetIdAndUniverseVerse;
        if (props) {
            setError('');
            // const full = props.props;
            // const spl =  splitStrByTrait(full, 'Charisma', 10);
            // const encoded = encode(spl.preStr, spl.postStr, props.cid, props.proof);
            // const text = full + ' ' + spl.preStr + ' ' + spl.postStr + ' ' + props.cid + ' ' + props.proof + ' ' + encoded;
            // const text = universeIdFromAssetId(assetId);
            setAssetJson(props.props);
            setAssetDataResult(props);
        } else {
            setError('No data found for this asset');
            setAssetJson('');
            setAssetDataResult(null);
        }
    }

    const [loadAsset, { isLoading }] = useLazyQuery(GET_ASSET_PROPS, {
        onError: (e) => setError(e.message),
        onCompleted: showData,
    });

    const [getCurrentVerse, { isVerseLoading }] = useLazyQuery(GET_CURRENT_VERSE, {
        onError: (e) => setError(e.message),
        onCompleted: (data) => setUniverseVerse(data.universeCurrentVerse),
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
            <Button variant="primary" disabled={assetJsonButtonDisabled} type="button" onClick={() => getCurrentVerse({variables: { universeId: universeIdFromAssetId(assetId).toString() }})} data-testid="get-button">
                Get Asset Data
            </Button>

            {(isLoading || isVerseLoading )&& <Loading />}
            {error && <ErrorDisplay errorText={error} onCloseFunct={closeErrorMessage} />}
            {assetJson !== '' && <InfoTemplate assetDataTemplateValue={assetJson} />}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control required type="traitType" placeholder="Enter Trait Type (e.g. Charisma)" data-testid="trait-type"
                    onChange={(e) => {
                        setTraitType(e.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control required type="traitVal" placeholder="Enter Trait Value (e.g. 10)" data-testid="trait-val"
                    onChange={(e) => {
                        setTraitVal(e.target.value);
                    }}
                />
            </Form.Group>
            <Button variant="primary" disabled={proofButtonDisabled} type="button" onClick={() => buildProof(traitType, traitVal, traitValIsNumber, assetDataResult)} data-testid="get-button">
                Get Proof
            </Button>
            {!traitValIsNumber && <Button onClick={() => setTraitValIsNumber(true)} data-testid="expand-button">String</Button>}
            {traitValIsNumber && <Button onClick={() => setTraitValIsNumber(false)} data-testid="collapse-button">Number</Button>}
        </Form>
    );
}

export default FormGetAsset;