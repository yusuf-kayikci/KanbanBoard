import React from "react";

interface IHeaderProps{
    iconPath : string,
    text : string
}

export const Header : React.FC<IHeaderProps> = (props) => {

    return(
                    <div className = "header">
                        <div className="icon" >
                            <img src={props.iconPath}></img>
                        </div>
                        <div className=" text" >{props.text}</div>
                    </div>
            
       
    );
}