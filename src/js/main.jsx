import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./todoList.css";

function TodoItem({ todo, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="todo-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="todo-text">{todo.text}</span>
      {hovered && (
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>✕</button>
      )}
    </div>
  );
}

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      setTodos([...todos, { id: Date.now(), text: trimmed }]);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <h1 className="title">todos</h1>
      <div className="card-stack">
        <div className="card">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="todo-list">
            {todos.length === 0 ? (
              <p className="empty-message">No tasks, add a task</p>
            ) : (
              todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
              ))
            )}
          </div>
          {todos.length > 0 && (
            <div className="footer">
              {todos.length} item{todos.length !== 1 ? "s" : ""} left
            </div>
          )}
        </div>
        <div className="shadow-1" />
        <div className="shadow-2" />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TodoList />);