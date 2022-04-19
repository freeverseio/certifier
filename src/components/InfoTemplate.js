
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function InfoTemplate({assetDataTemplateValue}) {
    return <div className="email-template">
         <Form.Group className="mb-3" controlId="formBasicEmailTemplate">
                    <Form.Control as="textarea" rows={5} readOnly
                        value={assetDataTemplateValue} data-testid="email-template" />
            </Form.Group>
    </div>;
}
export default InfoTemplate;