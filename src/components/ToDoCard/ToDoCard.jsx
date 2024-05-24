import React, { useEffect, useState } from "react";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./ToDoCard.scss";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ItemType = {
  TASK: "task",
};

const TaskCard = ({
  task,
  index,
  moveTask,
  handleCompleteTask,
  handleDeleteTask,
  handleEditTaskDescription,
  handleSaveTaskDescription,
  editingTaskId,
  editTaskDescription,
  setEditTaskDescription,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemType.TASK,
      item: { index, task },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index, task]
  );

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={drag} className="todo-card" style={{ opacity }}>
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
  );
};

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
        setCompletedTasks(completedTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleSearchByTag = (tag) => {
    setSearchTag(tag);
  };

  const filteredTasks = searchTag
    ? tasks.filter((task) => task.tags.includes(searchTag))
    : tasks;

  const moveTask = (dragIndex, hoverIndex, sourceList, setSourceList) => {
    const draggedTask = sourceList[dragIndex];
    const updatedTasks = [...sourceList];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setSourceList(updatedTasks);
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemType.TASK,
      drop: (item, monitor) => {
        const dragIndex = item.index;
        const task = item.task;
        const sourceList = task.completed ? completedTasks : tasks;
        const setSourceList = task.completed ? setCompletedTasks : setTasks;

        handleDeleteTask(task.id);
      },
    }),
    [tasks, completedTasks]
  );

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
          <input
            className="search"
            type="text"
            value={searchTag}
            onChange={(e) => handleSearchByTag(e.target.value)}
            placeholder="Поиск по тегам"
          />
        </div>
      </div>
      <div className="todo-lists">
        <DroppableColumn
          title="Текущие задачи"
          tasks={filteredTasks}
          setTasks={setTasks}
          moveTask={moveTask}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
          handleEditTaskDescription={handleEditTaskDescription}
          handleSaveTaskDescription={handleSaveTaskDescription}
          editingTaskId={editingTaskId}
          editTaskDescription={editTaskDescription}
          setEditTaskDescription={setEditTaskDescription}
          isCompleted={false}
        />
        <DroppableColumn
          title="Выполненные задачи"
          tasks={completedTasks}
          setTasks={setCompletedTasks}
          moveTask={moveTask}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
          handleEditTaskDescription={handleEditTaskDescription}
          handleSaveTaskDescription={handleSaveTaskDescription}
          editingTaskId={editingTaskId}
          editTaskDescription={editTaskDescription}
          setEditTaskDescription={setEditTaskDescription}
          isCompleted={true}
        />
        <div className="trash" ref={drop}>
          <DeleteForeverIcon style={{ fontSize: 40, fill:'#4482fc' }} />
        </div>
      </div>
    </div>
  );
};

const DroppableColumn = ({
  title,
  tasks,
  setTasks,
  moveTask,
  handleCompleteTask,
  handleDeleteTask,
  handleEditTaskDescription,
  handleSaveTaskDescription,
  editingTaskId,
  editTaskDescription,
  setEditTaskDescription,
  isCompleted,
}) => {
  const [, drop] = useDrop(
    () => ({
      accept: ItemType.TASK,
      drop: (item, monitor) => {
        const dragIndex = item.index;
        const draggedTask = item.task;

        if (draggedTask.completed !== isCompleted) {
          const updatedTask = { ...draggedTask, completed: isCompleted };

          axios
            .put(
              `https://6635d4e5415f4e1a5e256e75.mockapi.io/ToDoList/${draggedTask.id}`,
              updatedTask
            )
            .then(() => {
              setTasks((prevTasks) => [...prevTasks, updatedTask]);
              if (isCompleted) {
                setTasks((prevTasks) =>
                  prevTasks.filter((task) => task.id !== draggedTask.id)
                );
              }
            })
            .catch((error) => console.error("Error moving task:", error));
        }
      },
    }),
    [tasks]
  );

  return (
    <div className="todo-list" ref={drop}>
      <h4 className="todo-list-title">{title}</h4>
      {tasks.length === 0 && title === "Выполненные задачи" ? (
        <div className="empty-text">перетащите сюда выполненные компоненты</div>
      ) : (
        tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            index={index}
            task={task}
            moveTask={moveTask}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            handleEditTaskDescription={handleEditTaskDescription}
            handleSaveTaskDescription={handleSaveTaskDescription}
            editingTaskId={editingTaskId}
            editTaskDescription={editTaskDescription}
            setEditTaskDescription={setEditTaskDescription}
          />
        ))
      )}
    </div>
  );
};

export default ToDoCard;
