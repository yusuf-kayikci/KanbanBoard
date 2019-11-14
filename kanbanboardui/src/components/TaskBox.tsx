import React , {} from "react";
import Draggable from "react-draggable";
export interface ITask{

    id? :  number
    completeDate? : string,
    title : string,
    content : string,
    dueDate : string
    status : TaskStatus
}

export enum TaskStatus{
    TODO = 'TODO',
    ONGOING = 'ONGOING',
    DONE = 'DONE'
}




export const TaskBox : React.FC<ITask> = (props) => {
    console.log(props.completeDate)
    return(
                <div id= {props.id!.toString()} className="task" >
                    {props.completeDate != null && <div className="completedLabel">Completed on:{props.completeDate}</div>}
                    <div className = "title" style={{marginTop : (props.completeDate == null) ? 25 : 0}} >{props.title}</div>
                    <div className = "content" >{props.content}</div>
                    <div className = "dueDate" >Due Date : {props.dueDate}</div>
                </div>
    );
}
  
