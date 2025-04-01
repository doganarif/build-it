export const createTodoSlice = (set, get) => ({
  // Todos state
  todos: [],
  
  // Actions
  addTodo: (text) => 
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          text,
          completed: false,
          createdAt: new Date()
        }
      ]
    })),
    
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    })),
    
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter(todo => todo.id !== id)
    })),
    
  editTodo: (id, text) =>
    set((state) => ({
      todos: state.todos.map(todo =>
        todo.id === id
          ? { ...todo, text }
          : todo
      )
    })),
    
  clearCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.filter(todo => !todo.completed)
    })),
    
  getTodoById: (id) => {
    const todos = get().todos;
    return todos.find(todo => todo.id === id);
  }
}); 