import React, { useEffect, useState } from "react";
import axios from "axios";

const ToDoCard = () =>{

    const [newTodo, setNewTodo] = useState(false)
    const [toDoInfo, setToDoList] = useState()

    React.useEffect(()=>{
        fetch('https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList').then((res)=>{
            return res.json();
        })
        .then((json)=>{
            setToDoList(json)
        })
    })

    const addToDo = async (todo) => {
        try{
            const res = await axios.post('https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList', todo)
            console.log('todo ADDED', res.data)
        } catch (error) {
            console.log('error')
        }
    }

    return(
        <div>
            <button onClick={setNewTodo(true)}>
                add
            </button>
        </div>
    )
}

export default ToDoCard