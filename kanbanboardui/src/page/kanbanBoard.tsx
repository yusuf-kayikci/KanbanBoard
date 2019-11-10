import React, { useState, useEffect } from "react";
import { IImageBUttonProps, AddNewTaskButton } from "../components/addNewTaskButton";
import { ITaskBoxProps, TaskBox } from "../components/TaskBox";
import { Header } from "../components/Header";
import { AddNewTaskModal } from "../components/addNewTaskModal";
import _ from "lodash";

class TaskBoxProps implements ITaskBoxProps{

}


export const KanbanBoard : React.FC<any> = (props) => {
    const newTaskButtonProps : IImageBUttonProps = {
        image : "./images/add.png",
        
        onClick : (e : React.MouseEvent<HTMLImageElement , MouseEvent>) => {
            setShow(true);            
        }
    }
    const [tasks ,setTask] = useState<Array<TaskBoxProps>>();
    const [show , setShow] = useState<boolean>(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/tasks" , {
            method: "GET",
        }).then((response : any) => response.clone().json()).then((data : Array<ITaskBoxProps> )  => {
            setTask(data);
        });
    }, [])

    useEffect(() => {        
        console.log(tasks)
    },  [tasks != undefined])

    return(
        <div>
            <div className = "row">
                {
                    
                }

            <div  className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <Header iconPath ="./images/ongoing.png" text ="TODO"/> 
                {
                    tasks && tasks.map((t : TaskBoxProps) => {
                        return <TaskBox {...t}></TaskBox>
                    })
                }             
            </div>
            <div id="21" className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <Header iconPath ="./images/ongoing.png" text ="ONGOING"/>        
            </div>
            <div  className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <Header iconPath ="./images/ongoing.png" text ="DONE"/> 
            </div>
        </div>
            <AddNewTaskModal show={show} onHide={() => setShow(!show)} > </AddNewTaskModal>
            <div style={{textAlign : "end"}}>
                <AddNewTaskButton {...newTaskButtonProps}></AddNewTaskButton>
            </div>  
        </div>
        

    );
}