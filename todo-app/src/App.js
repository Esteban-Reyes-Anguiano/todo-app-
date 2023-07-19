import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    console.log("Lista de tareas actualizada:", todos);
  }, [todos]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: todos.length + 1, title: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Ingrese una nueva tarea..."
        />
        <button onClick={handleAddTodo}>Agregar Tarea</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
