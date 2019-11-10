import React , {} from "react";
import Draggable from "react-draggable";
export interface ITaskBoxProps{

    id? : string
    completeDate? : string,
    title? : string,
    content? : string,
    dueDate? : string
    status? : TaskStatus
}

export enum TaskStatus{
    TODO,
    ONGOING,
    DONE
}




export const TaskBox : React.FC<ITaskBoxProps> = (props) => {
    return(
        /*style = {{ borderRadius : 2 ,paddingLeft : 20  ,paddingBottom : 30 , marginBottom : 30 , borderStyle : "hidden" , height : 220 , boxShadow : "#e0e0e0 1px 2px 3px 1px" }}*/
        <Draggable  >
                <div id= {props.id} className="task" style={{position : "relative" , zIndex : 1001}}>
                    {props.completeDate != null && <div className="completedLabel">Completed on:{props.completeDate}</div>}
                    <div className = "title" style={{marginTop : (props.completeDate == null) ? 25 : 0}} >{props.title}</div>
                    <div className = "content" >{props.content}</div>
                    <div className = "dueDate" >Due Date : {props.dueDate}</div>
                </div>
        </Draggable>
        
    );
}
  
