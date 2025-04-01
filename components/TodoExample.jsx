'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store/index';

export default function TodoExample() {
  const [newTodo, setNewTodo] = useState('');
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    removeTodo, 
    clearCompletedTodos 
  } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow p-2 border rounded-l"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Add
        </button>
      </form>
      
      <ul className="mb-4">
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            className="flex items-center justify-between p-2 border-b"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </div>
            <button 
              onClick={() => removeTodo(todo.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.some(todo => todo.completed) && (
        <button 
          onClick={clearCompletedTodos}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Clear completed
        </button>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        {todos.filter(todo => !todo.completed).length} items left
      </div>
    </div>
  );
} 