
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function EmailTemplate({emailTemplateValue}) {
    const [showToggleButton, toggleShow] = useState(true);
    return <div className="email-template">
         <Form.Group className="mb-3" controlId="formBasicEmailTemplate">
                {!showToggleButton && <Button onClick={() => toggleShow(true)} data-testid="expand-button">Expand</Button>}
                {showToggleButton && <Button onClick={() => toggleShow(false)} data-testid="collapse-button">Collapse</Button>}
                {showToggleButton &&
                    <Form.Control as="textarea" rows={5} readOnly
                        value={emailTemplateValue} data-testid="email-template" />
                }
            </Form.Group>
    </div>;
}
export default EmailTemplate;