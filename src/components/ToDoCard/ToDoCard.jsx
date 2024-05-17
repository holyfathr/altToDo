import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ToDoCard.scss";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

const ToDoCard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskDate, setTaskDate] = useState('');

  useEffect(() => {
    axios
      .get("https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      axios
        .post("https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList", {
          title: newTask,
          description: newDescription,
          deadline: taskDate,
        })
        .then((response) => {
          setTasks([...tasks, taskDate, response.data]);
          setNewTask("");
          setNewDescription("");
          setTaskDate("");
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const handleCompleteTask = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTaskDescription = (id, description) => {
    setEditTaskDescription(description);
    setEditingTaskId(id);
  };

  const handleSaveTaskDescription = (id) => {
    const editedTask = tasks.find((task) => task.id === id);
    editedTask.description = editTaskDescription;
    axios
      .put(
        `https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList/${id}`,
        editedTask
      )
      .then(() => {
        setTasks(tasks.map((task) => (task.id === id ? editedTask : task)));
        setEditingTaskId(null);
        setEditTaskDescription("");
      })
      .catch((error) =>
        console.error("Error editing task description:", error)
      );
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`https://66355114415f4e1a5e243e10.mockapi.io/ToDo/ToDoList/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleDeleteCompletedTask = (id) => {
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-app">
      <div className="header">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая таска"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Описание"
        />
        <input className="dateInput"
            type="date"
            value={taskDate}
            onChange={e => setTaskDate(e.target.value)}            
            placeholder="Дата сдачи"
          />
        <button className="add-btn" onClick={handleAddTask}>
          +
        </button>
      </div>
      <h4 className="todo-list-title">Текущие задачи</h4>
      <div className="todo-list">
        {tasks.map((task) => (
          <div key={task.id} className="todo-card">
            <div className="todo-card-text">
              <div className="todo-card-title">{task.title}</div>
              <div className="todo-card-date">{task.deadline}</div>
              {editingTaskId === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editTaskDescription}
                    onChange={(e) => setEditTaskDescription(e.target.value)}
                  />
                  <button onClick={() => handleSaveTaskDescription(task.id)}>
                    Save
                  </button>
                </div>
              ) : (
                <div className="todo-card-buttonsн">
                  <div className="todo-card-description">
                    {task.description}
                  </div>
                  <button className="editBtn"
                    onClick={() =>
                      handleEditTaskDescription(task.id, task.description)
                    }
                  >
                    Edit Description
                  </button>
                </div>
              )}
            </div>
            <div className="todo-card-buttons">
              <button onClick={() => handleCompleteTask(task.id)}>
                <CheckIcon />
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
      <h4 className="todo-list-title">Выполненные задачи</h4>
      <div className="todo-list">
        {completedTasks.map((task) => (
          <div key={task.id} className="todo-card">
            <div className="todo-card-text">
              <div className="todo-card-title">{task.title}</div>
              <div className="todo-card-description">{task.description}</div>
            </div>
            <div className="todo-card-buttons">
              <button onClick={() => handleDeleteCompletedTask(task.id)}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ToDoCard;
