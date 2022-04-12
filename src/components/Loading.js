import Spinner from 'react-bootstrap/Spinner';

function Loading() {
    return (
      <div>
        <Spinner className="mr-1" aria-hidden="true" animation="grow" variant="primary" />
        <Spinner className="mr-1" animation="grow" variant="success" />
        <Spinner className="mr-1" animation="grow" variant="danger" />
        <Spinner className="mr-1" animation="grow" variant="warning" />
      </div>
    );
  }

  export default Loading;