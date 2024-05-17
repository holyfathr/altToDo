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
  const [newDueDate, setNewDueDate] = useState("");
  const [newTags, setNewTags] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchTag, setSearchTag] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios
        .get(`https://6635d4e5415f4e1a5e256e75.mockapi.io/ToDoList`, {
          params: {
            userId: user.id,
          },
        })
        .then((response) => {
          const tasks = response.data.filter((task) => !task.completed);
          const completed = response.data.filter((task) => task.completed);
          // Ensure all tasks have tags field
          const tasksWithTags = response.data.map((task) => ({
            ...task,
            tags: task.tags || [],
          }));
          setTasks(tasksWithTags.filter((task) => !task.completed));
          setCompletedTasks(tasksWithTags.filter((task) => task.completed));
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [user]);

  const handleAddTask = () => {
    if (newTask.trim() !== "" && newDueDate.trim() !== "") {
      axios
        .post("https://6635d4e5415f4e1a5e256e75.mockapi.io/ToDoList", {
          title: newTask,
          description: newDescription,
          dueDate: newDueDate,
          completed: false,
          userId: user.id,
          tags: newTags.split(",").map((tag) => tag.trim()),
        })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask("");
          setNewDescription("");
          setNewDueDate("");
          setNewTags("");
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const handleCompleteTask = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    axios
      .put(`https://6635d4e5415f4e1a5e256e75.mockapi.io/ToDoList/${id}`, {
        ...completedTask,
        completed: true,
      })
      .then(() => {
        setCompletedTasks([
          ...completedTasks,
          { ...completedTask, completed: true },
        ]);
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
      .put(
        `https://6635d4e5415f4e1a5e256e75.mockapi.io/ToDoList/${id}`,
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
      .delete(`https://6635d4e5415f4e1a5e256e75.mockapi.io/ToDoList/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleDeleteCompletedTask = (id) => {
    axios
      .delete(`https://6635d4e5415f4e1a5e256e75.mockapi.io/ToDoList/${id}`)
      .then(() => {
        setCompletedTasks(completedTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting completed task:", error));
  };

  const handleSearchByTag = (tag) => {
    setSearchTag(tag);
  };

  const filteredTasks = searchTag
    ? tasks.filter((task) => task.tags.includes(searchTag))
    : tasks;

  return (
    <div className="todo-app">
      <div className="headerWrapper">
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
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <input
            type="text"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            placeholder="Теги (через запятую)"
          />
          <button className="add-btn" onClick={handleAddTask}>
            +
          </button>
          <input className="search"
            type="text"
            value={searchTag}
            onChange={(e) => handleSearchByTag(e.target.value)}
            placeholder="Поиск по тегам"
          />
        </div>
      </div>
      <h4 className="todo-list-title">Текущие задачи</h4>
      <div className="todo-list">
        {filteredTasks.map((task) => (
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
                <div>
                  <div className="todo-card-description">
                    {task.description}
                  </div>
                  <div className="todo-card-dueDate">
                    Срок выполнения: {task.dueDate}
                  </div>
                  <div className="todo-card-tags">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="todo-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="editBtn"
                    onClick={() =>
                      handleEditTaskDescription(task.id, task.description)
                    }
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
              <div className="todo-card-dueDate">
                Срок выполнения: {task.dueDate}
              </div>
              <div className="todo-card-tags">
                {task.tags.map((tag, index) => (
                  <span key={index} className="todo-tag">
                    {tag}
                  </span>
                ))}
              </div>
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
