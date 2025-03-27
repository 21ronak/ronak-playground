import React from "react";

const TodoItem = ({ todo, onToggleTodo }) => {
  return (
    <div style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
      {todo.text}
      <button onClick={() => onToggleTodo(todo.id)}>Toggle</button>
    </div>
  );
};

export default TodoItem;
