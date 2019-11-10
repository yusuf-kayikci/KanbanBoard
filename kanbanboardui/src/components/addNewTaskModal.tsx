import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface IModalProps{
    show : boolean
    onHide : () => void
}

export const AddNewTaskModal : React.FC<IModalProps> = (props) => {
    return(
        <Modal show={props.show} onHide ={props.onHide}  >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>
        </Modal>
        
    );
}