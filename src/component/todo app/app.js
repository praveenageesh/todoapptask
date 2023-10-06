// TodoApp.js
import React, { useState } from "react";
import TodoCard from "./todocard";

const statuses = ["All", "Completed", "Not Completed"];

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const addTodo = (taskName, description) => {
    const newTodo = {
      id: Date.now(),
      taskName,
      description,
      status: "Not Completed",
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleStatusChange = (id, status) => {
    updateTodo(id, { status });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === "All") return true;
    return todo.status === filterStatus;
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          id="taskName"
          ref={(input) => (taskNameInput = input)}
        />
        <input
          type="text"
          placeholder="Description"
          id="description"
          ref={(input) => (descriptionInput = input)}
        />
        <button
          onClick={() => {
            addTodo(taskNameInput.value, descriptionInput.value);
            taskNameInput.value = "";
            descriptionInput.value = "";
          }}
        >
          Add Todo
        </button>
      </div>
      <div>
        <label>Filter by Status: </label>
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onUpdate={(updatedTodo) => updateTodo(todo.id, updatedTodo)}
            onDelete={() => deleteTodo(todo.id)}
            onStatusChange={(status) => handleStatusChange(todo.id, status)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
