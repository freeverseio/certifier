import Alert from 'react-bootstrap/Alert';

function ErrorDisplay({ errorText, onCloseFunct }) {

    return <div className='error-message'>
        <Alert variant="danger" onClose={() => onCloseFunct()} dismissible data-testid="error-message">
            <Alert.Heading>You got an error!</Alert.Heading>
            <p>
                {errorText}
            </p>
        </Alert>
    </div>
}

export default ErrorDisplay;