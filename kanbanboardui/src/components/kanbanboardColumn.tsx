import React, { useState, useEffect } from "react";
import { Droppable , Draggable } from "react-beautiful-dnd";
import { ITask, TaskStatus, TaskBox } from "./TaskBox";
import {  getItemStyle, reorder, move, getListStyle } from "../helper/dragDropHelper";
import { TaskBoxProps } from "../page/kanbanBoard";

interface IColumnProp{
    id : string
    tasks : Array<ITask>
    status : TaskStatus    
}





export const KanbanboardColumn : React.FC<IColumnProp> = (props) => {


    const [tasks , setTasks] = useState()

    useEffect(() => {
        setTasks(props.tasks);
    } , [props.tasks])

    let i = 0;
    return(        
        <Droppable droppableId={props.id} >
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                                    {
                                        tasks && tasks!.map((t : ITask , index : number) => {
                                            
                                            return t  && t.status == props.status && <Draggable
                                            key={t.id + index.toString()}
                                            draggableId={t.id + index.toString()}
                                            index={i++}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}>
                                                        <TaskBox {...t}></TaskBox>
                                                </div>
                                            )}
                                        </Draggable>
                                            
                                        })
                                    }             
                                </div>
                        )}
                        </Droppable>
    );
}