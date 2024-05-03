import React from "react";
import ToDoCard from "../components/ToDoCard/ToDoCard";
import Header from "../components/Header/Header";
import "./ToDoList.scss"

const ToDoList = () => {
    return(
       <>
            <Header/>
            <div className="body">
                <ToDoCard/>
            </div>
       </>
    )
}

export default ToDoList