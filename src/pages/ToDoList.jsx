import React from "react";
import ToDoCard from "../components/ToDoCard/ToDoCard";
import Header from "../components/Header/Header";
import "./ToDoList.scss"

const ToDoList = () => {
    return(
       <div className="app">
            <Header/>
            <div className="body">
                <ToDoCard/>
            </div>
       </div>
    )
}

export default ToDoList