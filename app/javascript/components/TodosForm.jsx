import React, { useState, useEffect } from "react";

function TodoForm({ todo, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    } else {
      setTitle("");
      setCompleted(false);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send
    const todoData = {
      title,
      completed,
    };

    if (todo) {
      // Editing existing todo: PATCH request
      fetch(`/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: todoData }),
      })
        .then((res) => res.json())
        .then((updatedTodo) => onSubmit(updatedTodo))
        .catch(console.error);
    } else {
      // Adding new todo: POST request
      fetch("/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: todoData }),
      })
        .then((res) => res.json())
        .then((newTodo) => {
          onSubmit(); // fetchTodos will be called from parent
          setTitle(""); // reset form
          setCompleted(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="todoTitle" className="form-label">
          Title
        </label>
        <input
          id="todoTitle"
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-check mb-3">
        <input
          id="todoCompleted"
          className="form-check-input"
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label htmlFor="todoCompleted" className="form-check-label">
          Completed
        </label>
      </div>

      <button type="submit" className="btn btn-success me-2">
        {todo ? "Update Todo" : "Add Todo"}
      </button>
      {todo && (
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TodoForm;
