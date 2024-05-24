import React from "react";
import ToDoCard from "../components/ToDoCard/ToDoCard";
import Header from "../components/Header/Header";
import "./ToDoList.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ToDoList = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Header />
        <div className="body">
          <ToDoCard />
        </div>
      </div>
    </DndProvider>
  );
};

export default ToDoList;
