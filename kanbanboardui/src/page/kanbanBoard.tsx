import React, { useState, useEffect } from "react";
import { IImageBUttonProps, AddNewTaskButton } from "../components/addNewTaskButton";
import { ITask, TaskBox, TaskStatus } from "../components/TaskBox";
import { Header } from "../components/Header";
import { AddNewTaskModal } from "../components/addNewTaskModal";
import _ from "lodash";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getItemStyle, getListStyle, move, reorder } from "../helper/dragDropHelper";
import { KanbanboardColumn } from "../components/kanbanboardColumn";
import { Get, Put } from "../helper/requestHelper";

export interface TaskBoxProps extends ITask{

}

interface ITaskState{
    id : string
    items : any[]
}


interface TODOState extends ITaskState{}
interface DONEState extends ITaskState{}
interface ONGOINGState extends ITaskState{}




export const KanbanBoard : React.FC<any> = (props) => {


    const newTaskButtonProps : IImageBUttonProps = {
        image : "./images/add.png",
        
        onClick : (e : React.MouseEvent<HTMLImageElement , MouseEvent>) => {
            
            setShow(true);            
        }
    }
    //MANAGE STATES SEPARATELY FOR OPTIMUM PERFORMANCE
    const [todoState , setTodoState] = useState<TODOState>({items : [] , id : TaskStatus.TODO})
    const [doneState , setDoneState] = useState<DONEState>({items : [] , id : TaskStatus.DONE})
    const [ongoingState , setOngoingState] = useState<ONGOINGState>({items : [] , id : TaskStatus.ONGOING})
    //CHECK STATE OF MODAL
    const [show , setShow] = useState<boolean>(false);


    const fetchTasks = () => {
        Get().then((data : Array<ITask> )  => {
            // setState({...state , items : data})
            setTodoState({...todoState , items : data.filter((x : ITask) => x.status == TaskStatus.TODO)})
            setDoneState({...doneState , items : data.filter((x : ITask) => x.status == TaskStatus.DONE)})
            setOngoingState({...ongoingState , items : data.filter((x : ITask) => x.status == TaskStatus.ONGOING)})
        });
    }

    //FETCH WHEN LOAD PAGE 
    useEffect(() => {
        fetchTasks();
    }, [])


    const getList = (sourceName : string) => {
        switch (sourceName) {
            case TaskStatus.TODO:
                return todoState!.items;
            case TaskStatus.ONGOING:                    
                return ongoingState!.items;
            default:
                return doneState!.items;
        }
    } 









    
    const onDragEnd = (result  :any) => {
        console.log(result);
        const { source, destination } = result;
        console.log(result);
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            console.log("source destination eşit...");
            debugger;
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );
            console.log(items);
            refreshThenReOrder(source.droppableId , items)

        } 
        else {
            debugger;
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            debugger;
            let putObject : ITask = result[2];        
            putObject.status = destination.droppableId;
            if(putObject.status == TaskStatus.DONE){
                putObject.completeDate = new Date().toLocaleDateString();
            }
            else{
                putObject.completeDate = undefined;
            }
            Put(putObject.id! , putObject).then(data => {
                refreshSourceThenMove(result[0])
                refreshDestThenMove(result[1])                
            })





        }
    };





    const refreshDestThenMove= (result : any) => {
        switch (result.id) {
            case TaskStatus.TODO:
                    result.items.every((x: any) => {
                        x.status = TaskStatus.TODO;
                    })
                setTodoState({...todoState , items : result.items})
                break;
            case TaskStatus.ONGOING:
                    result.items.every((x: any) => {
                        x.status = TaskStatus.ONGOING;
                    })
                setOngoingState({...ongoingState , items : result.items});
                break;
            default:
                    result.items.every((x: any) => {
                        x.status = TaskStatus.DONE;
                    })
                setDoneState({...doneState , items : result.items})
                break;
        }
    }

    const refreshSourceThenMove = (result : any) => {
        switch (result.id) {
            case TaskStatus.TODO:
                result.items.every((x: any) => {
                    x.status = TaskStatus.TODO;
                })
                setTodoState({...todoState , items : result.items})
                break;
            case TaskStatus.ONGOING:
                    result.items.every((x: any) => {
                        x.status = TaskStatus.ONGOING;
                    })
                setOngoingState({...ongoingState , items : result.items});
                break;
            default:
                    result.items.every((x: any) => {
                        x.status = TaskStatus.DONE;
                    })
                setDoneState({...doneState , items : result.items})
                break;
        }
    }

    const refreshThenReOrder = (sourceName : string , items : any) => {
        switch (sourceName) {
            case TaskStatus.TODO:
                setTodoState({...todoState , items : items})
                break;
            case TaskStatus.ONGOING:                    
                setOngoingState({...ongoingState , items : items});
                break;
            default:
                setDoneState({...doneState , items : items})
                break;
        }
    }








    return(
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className = "row">
                    <div  className="col">    
                        <Header iconPath ="./images/todo.png" text ="TODO"/> 
                        <KanbanboardColumn id="TODO" tasks = {todoState.items!} status={TaskStatus.TODO}></KanbanboardColumn>
                    </div>
                    <div  className="col">
                        <Header iconPath ="./images/ongoing.png" text ="ONGOING"/> 
                        <KanbanboardColumn  id ="ONGOING" tasks = {ongoingState.items!} status={TaskStatus.ONGOING}></KanbanboardColumn>
                    </div>
                    <div  className="col">
                        <Header iconPath ="./images/done.png" text ="TODO"/> 
                        <KanbanboardColumn id="DONE" tasks = {doneState.items!} status={TaskStatus.DONE}> </KanbanboardColumn>
                    </div>                            
                </div>
            </DragDropContext>
            
            <AddNewTaskModal show={show} onHide={() => setShow(!show)} onCreatedTask = {() => fetchTasks()} > </AddNewTaskModal>
            <div style={{textAlign : "end"}}>
                <AddNewTaskButton {...newTaskButtonProps}></AddNewTaskButton>
            </div>  
        </div>        
    );
}