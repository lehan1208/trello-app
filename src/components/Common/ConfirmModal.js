import React from 'react';
import Modal from 'react-bootstrap/Modal';
import parse from 'html-react-parser';
import Button from 'react-bootstrap/Button';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../constant';

function ConfirmModal(props) {
  const { title, content, show, onAction } = props;

  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={() => onAction(MODAL_ACTION_CLOSE)}
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{parse(content)}</Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => onAction(MODAL_ACTION_CLOSE)}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => onAction(MODAL_ACTION_CONFIRM)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
