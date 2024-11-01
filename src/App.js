import React, { useState } from 'react';
import './App.css';

function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: 'Learn React', completed: false },
        { id: 2, task: 'Build a Todo App', completed: false },
    ]);

    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    const addTodo = () => {
        if (!newTask) return;
        const newTodo = {
            id: Date.now(),
            task: newTask,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setNewTask('');
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const startEdit = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        setNewTask(todoToEdit.task);
        setIsEditing(true);
        setCurrentTaskId(id);
    };

    const updateTodo = () => {
        setTodos(todos.map(todo =>
            todo.id === currentTaskId ? { ...todo, task: newTask } : todo
        ));
        setNewTask('');
        setIsEditing(false);
        setCurrentTaskId(null);
    };

    return (
        <div className="container mt-5">
            <h1>Todo List</h1>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)} 
                />
                <button 
                    className="btn btn-primary" 
                    onClick={isEditing ? updateTodo : addTodo}
                >
                    {isEditing ? 'Update' : 'Add'}
                </button>
            </div>
            <div className="todo-list">
                {todos.map(todo => (
                    <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <span onClick={() => toggleComplete(todo.id)} style={{ cursor: 'pointer' }}>
                            {todo.task}
                        </span>
                        <div>
                            <button className="btn btn-secondary btn-sm me-2" onClick={() => startEdit(todo.id)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
