/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useLazyQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import { GET_ASSET_PROPS } from '../graphql/mutations/asset';
import Loading from './Loading';
import InfoTemplate from './InfoTemplate';
import ErrorDisplay from './ErrorDisplay';

import { splitStrByTrait, encode } from '../utils/jsonUtils';


function FormGetAsset() {

    const [assetId, setAssetId] = useState('');
    const [assetDataResult, setAssetDataResult] = useState(null);
    const [assetJson, setAssetJson] = useState('');
    const [traitType, setTraitType] = useState('');
    const [traitVal, setTraitVal] = useState('');
    const [traitValIsNumber, setTraitValIsNumber] = useState(true);
    const [proof, setProof] = useState('');
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
        setProofButtonDisabled(!assetDataResult || traitType === '' || traitVal === '');
    }, [traitType, traitVal, assetDataResult, traitValIsNumber]);
   
    // variables: { assetId: '655676227982332778968688736442226131714727085092' },

    const buildProof = (_traitType, _traitVal, _isNumber, _props) => {
        setProofButtonDisabled(true);
        const propsJson = String(_props.props);
        const val = _isNumber ? Number(_traitVal) : String(_traitVal);
        try {
            const propsSplit = splitStrByTrait(propsJson, String(_traitType), val);
            const encoded = encode(propsSplit.preStr, propsSplit.postStr, _props.cid, _props.proof);
            setProof(encoded);
        } catch {
            setProof('Value not found in the asset properties');
        }
    }

    const showData = (data) => {
        const props = data?.assetPropsById;
        if (props) {
            setError('');
            // eslint-disable-next-line react/prop-types
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

    const handleSelect=(e)=>{
        setTraitValIsNumber(e === 'number');
      }

    return (
        <Form>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control required type="assetId" placeholder="Enter AssetId" data-testid="assetId"
                                    onChange={(e) => {
                                        setAssetId(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </td>
                        <td>
                            <Button className="mb-3" variant="primary" disabled={assetJsonButtonDisabled} type="button" onClick={() => loadAsset({variables: { assetId: assetId.toString() }})} data-testid="get-button">
                                Get Asset Data
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            {(isLoading )&& <Loading />}
            {error && <ErrorDisplay errorText={error} onCloseFunct={closeErrorMessage} />}
            {assetJson !== '' && <InfoTemplate info={assetJson} />}
            {assetJson !== '' && 
                <>
                    <table className="table sm w-auto">
                        <tbody>
                            <tr>
                                <td >
                                    Prove that the asset has:                 
                                </td>
                                <td>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control required type="traitType" placeholder="Enter Trait Type (e.g. Charisma)" data-testid="trait-type"
                            onChange={(e) => {
                                setTraitType(e.target.value);
                            }}
                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control required type="traitVal" placeholder="Enter Trait Value (e.g. 10)" data-testid="trait-val"
                                onChange={(e) => {
                                    setTraitVal(e.target.value);
                                }}
                            />
                                    </Form.Group>
                                </td>
                                <td>
                                    <DropdownButton
                            alignRight
                            title={traitValIsNumber ? 'Number' : 'String'}
                            id="dropdown-menu-align-right"
                            onSelect={handleSelect}
                        >
                                        <Dropdown.Item eventKey="number">Number</Dropdown.Item>
                                        <Dropdown.Item eventKey="string">String</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Button variant="primary" disabled={proofButtonDisabled} type="button" onClick={() => buildProof(traitType, traitVal, traitValIsNumber, assetDataResult)} data-testid="get-button">
                        Get Proof
                    </Button>
                    {proof !== '' && <InfoTemplate info={proof} />}
                </>}
        </Form>
    );
}

export default FormGetAsset;