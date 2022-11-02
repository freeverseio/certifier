
import React from 'react';
import Form from 'react-bootstrap/Form';


function InfoTemplate({info}) {
    return <div className="email-template">
         <Form.Group className="mb-3" controlId="formBasicEmailTemplate">
                    <Form.Control as="textarea" rows={5} readOnly
                        value={info} data-testid="email-template" />
            </Form.Group>
    </div>;
}
export default InfoTemplate;