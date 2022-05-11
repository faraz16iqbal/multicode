import React, { useState } from 'react'
import { Button, Modal, FormControl, InputGroup } from 'react-bootstrap'


const Backdrop: React.FC<any> = ({ handleNameSubmit }) => {
    const [show, setShow] = useState<boolean>(true);

    return (
        <>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Please enter your name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleNameSubmit}>Let's Go</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Backdrop;