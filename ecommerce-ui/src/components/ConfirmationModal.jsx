import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ action, handleConfirm, handleClose }) {
    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
        setLoading(true);
        await handleConfirm();
        setLoading(false);
        handleClose();
    };

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Action</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to {action}? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleAction} disabled={loading}>
                    {loading ? 'Processing...' : 'Confirm'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;