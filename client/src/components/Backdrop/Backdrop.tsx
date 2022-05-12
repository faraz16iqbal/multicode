import React from 'react'
import { Button, Modal, FormControl, InputGroup } from 'react-bootstrap'


type props = {
    handleNameSubmit: Function,
    handleNameChange: Function,
    show: boolean
}

const Backdrop: React.FC<props> = ({ handleNameSubmit, handleNameChange, show }) => {
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
                            placeholder="Your name"
                            aria-label="Your name"
                            aria-describedby="basic-addon2"
                            onChange={(e) => handleNameChange(e)}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e) => handleNameSubmit(e)}>Let's Go</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Backdrop;