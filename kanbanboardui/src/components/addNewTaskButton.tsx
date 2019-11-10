import React from "react";

export interface IImageBUttonProps{
    onClick? : (e : React.MouseEvent<HTMLImageElement,MouseEvent>) => void
    image? : string
}

export const AddNewTaskButton : React.FC<IImageBUttonProps> = (props) => {
    return(
        <img src={props.image} className="imageButton" onClick={props.onClick} width={50} height = {50}>
        </img>
    );
}