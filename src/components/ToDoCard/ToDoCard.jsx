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
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      axios
        .get(`https://66478ad02bb946cf2f9e1ac8.mockapi.io/ToDoList`, {
          params: {
            userId: user.id
          }
        })
        .then((response) => {
          const tasks = response.data.filter(task => !task.completed);
          const completed = response.data.filter(task => task.completed);
          setTasks(tasks);
          setCompletedTasks(completed);
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [user]);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      axios
        .post("https://66478ad02bb946cf2f9e1ac8.mockapi.io/ToDoList", {
          title: newTask,
          description: newDescription,
          completed: false,
          userId: user.id
        })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask("");
          setNewDescription("");
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const handleCompleteTask = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    axios
      .put(`https://66478ad02bb946cf2f9e1ac8.mockapi.io/ToDoList/${id}`, {
        ...completedTask,
        completed: true
      })
      .then(() => {
        setCompletedTasks([...completedTasks, { ...completedTask, completed: true }]);
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error completing task:", error));
  };

  const handleEditTaskDescription = (id, description) => {
    setEditTaskDescription(description);
    setEditingTaskId(id);
  };

  const handleSaveTaskDescription = (id) => {
    const editedTask = tasks.find((task) => task.id === id);
    editedTask.description = editTaskDescription;
    axios
      .put(`https://66478ad02bb946cf2f9e1ac8.mockapi.io/ToDoList/${id}`, editedTask)
      .then(() => {
        setTasks(tasks.map((task) => (task.id === id ? editedTask : task)));
        setEditingTaskId(null);
        setEditTaskDescription("");
      })
      .catch((error) => console.error("Error editing task description:", error));
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`https://66478ad02bb946cf2f9e1ac8.mockapi.io/ToDoList/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleDeleteCompletedTask = (id) => {
    axios
      .delete(`https://66478ad02bb946cf2f9e1ac8.mockapi.io/ToDoList/${id}`)
      .then(() => {
        setCompletedTasks(completedTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting completed task:", error));
  };

  return (
    <div className="todo-app">
      <div className="header">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Описание"
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
                <div className="todo-card-buttons">
                  <div className="todo-card-description">{task.description}</div>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditTaskDescription(task.id, task.description)}
                  >
                    Изменить
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
