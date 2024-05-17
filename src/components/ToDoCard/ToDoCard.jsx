import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ToDoCard.scss";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

const ToDoCard = () =>{

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
  
    // Загрузка существующих задач при монтировании компонента
    useEffect(() => {
        axios.get('https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList')
          .then(response => {
            setTasks(response.data); // Сохраняем весь массив объектов задач
          })
          .catch(error => console.error('Error fetching tasks:', error));
      }, []);
      
  
    const handleAddTask = () => {
        if (newTask.trim() !== '') {
          axios.post('https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList', { title: newTask, deadline: taskDate})
            .then(response => {
              setTasks([...tasks, taskDate, response.data]); // Теперь сохраняем весь объект задачи
              setNewTask(''); // Очистка поля ввода
              // setTaskDate('');
            })
            .catch(error => console.error('Error adding task:', error));
        }
      };
      

    const handleDeleteTask = (id) => {
        axios.delete(`https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList/${id}`)
          .then(() => {
            setTasks(tasks.filter(task => task.id !== id));
          })
          .catch(error => console.error('Error deleting task:', error));
      };
          
  
    return (
      <div className="todo-app">
        <div className="header">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Новая таска"
          />
          <input className="dateInput"
            type="date"
            value={taskDate}
            onChange={e => setTaskDate(e.target.value)}            
            placeholder="Дата сдачи"
          />
          <button className="add-btn" onClick={handleAddTask}>+</button>
        </div>
        <h4 className="todo-list-title">Текущие задачи</h4>
        <div className="todo-list">
            {tasks.map((task) => (
                <div key={task.id} className="todo-card">
                    <div className="todo-card-text">{task.title}</div>
                    <div className="todo-card-date">{task.deadline}</div>
                    <div className="todo-card-buttons">
                        <button><CheckIcon/></button>
                        <button onClick={() => handleDeleteTask(task.id)}><DeleteIcon/></button>
                    </div>
                </div>
            ))}
        </div>
        <h4 className="todo-list-title">Выполненые задачи</h4>
        <div className="todo-list">
        </div>
      </div>
    );
  }
export default ToDoCard