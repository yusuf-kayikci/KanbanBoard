import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { ITask, TaskStatus } from "./TaskBox";
import { Post } from "../helper/requestHelper";

interface IModalProps{
    show : boolean
    onHide : () => void
    onCreatedTask : () => void
}







export const AddNewTaskModal : React.FC<IModalProps> = (props) => {
    const [input , setInput] = useState<ITask>({
        title : "",
        completeDate : "",
        content : "",
        dueDate : "",
        status : TaskStatus.TODO

    });


    return(
        <Modal show={props.show} onHide ={props.onHide}  >
            <Modal.Header closeButton>
                <Modal.Title>New Task</Modal.Title>
            </Modal.Header>

            <Modal.Body className="container">

                    <div className="row form-margin">
                        <div className="col-md-6 col-lg-4 col-sm-6 col-xs-12"> Task Title </div>
                        <div className="col-md-6 col-lg-4 col-sm-6 col-xs-12"> <input type="text" 
                        onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setInput({...input , title : evt.target.value})} ></input></div>
                    </div>
                    <div className="row form-margin ">
                        <div className="col-md-6 col-lg-4 col-sm-6 col-xs-12"> Task Content </div>
                        <div className="col-md-6 col-lg-4 col-sm-6 col-xs-12"> 
                        <input onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setInput({...input , content : evt.target.value})}></input></div>
                    </div>
                    <div className="row form-margin ">
                        <div className="col-md-6 col-lg-4 col-sm-6 col-xs-12"> Due Date </div>
                        <div className="col-md-6 col-lg-4 col-sm-6 col-xs-12"> 
                        <input type="date" onChange={(evt : React.ChangeEvent<HTMLInputElement>) => setInput({...input , dueDate : evt.target.value})}  ></input></div>
                    </div>
                    <div className ="confirmNewTaskButtonWrapper">
                        <button onClick={(evt : any) => {
                            Post(input).then((data : ITask) => {
                                console.log(data);
                                alert(data.title  + " created...");
                                props.onCreatedTask();
                                
                            }).finally(() => {
                                props.onHide();
                            })


                        }}>Create Task</button>
                    </div>
                
            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>
        </Modal>
        
    );
}