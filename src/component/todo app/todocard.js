// TodoCard.js
import React, { useState } from "react";

const TodoCard = ({ todo, onUpdate, onDelete, onStatusChange }) => {
  const [isEditing, setEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const handleStatusClick = () => {
    const newStatus =
      updatedTodo.status === "Not Completed" ? "Completed" : "Not Completed";
    setUpdatedTodo({ ...updatedTodo, status: newStatus });
    onStatusChange(newStatus);
  };

  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTodo.taskName}
            onChange={(e) => setUpdatedTodo({ ...updatedTodo, taskName: e.target.value })}
          />
          <input
            type="text"
            value={updatedTodo.description}
            onChange={(e) => setUpdatedTodo({ ...updatedTodo, description: e.target.value })}
          />
          <button onClick={() => onUpdate(updatedTodo)}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{todo.taskName}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.status}</p>
          <button onClick={handleStatusClick}>Toggle Status</button>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
