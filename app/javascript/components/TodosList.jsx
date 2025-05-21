import React, { useEffect, useState } from "react";

const TodosList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("/todos/all_todos_json")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    fetch(`/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": document
          .querySelector("meta[name='csrf-token']")
          ?.getAttribute("content"),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  return (
    <div className="container mt-4">
      <h2>Todos</h2>

      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        todos.map((todo) => (
          <div className="card mb-3" key={todo.id}>
            <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
              <p>
                Status: {todo.completed ? "✅ Completed" : "❌ Not Completed"}
              </p>
              <a
                href={`/todos/${todo.id}/edit`}
                className="btn btn-primary me-2"
              >
                Edit
              </a>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodosList;
