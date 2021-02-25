import React from "react";
import "./ColumnCommands.css"
interface ColumnCommandsProps {
    children: any
}

const ColumnCommands = ({children}: ColumnCommandsProps) => {
    return (
        <div className={"column-commands-container"}>
            {children}
        </div>
    )
}

export default ColumnCommands;
