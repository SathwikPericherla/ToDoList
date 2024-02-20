import React, { useState, useEffect } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function InputChange(event) {
        setNewTask(event.target.value);
    }

    function AddTask() {
        if (newTask.trim() !== '') {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTask('');
        }
    }

    function EnterKeyPress(event) {
        if (event.key === 'Enter') {
            AddTask();
        }
    }

    function RemoveTask(index) {
        const latestTasks = tasks.filter((_, i) => i !== index);
        setTasks(latestTasks);
    }

    function MoveUp(index) {
        if (index > 0) {
            const latestTasks = [...tasks];
            [latestTasks[index], latestTasks[index - 1]] = [latestTasks[index - 1], latestTasks[index]];
            setTasks(latestTasks);
        }
    }

    function MoveDown(index) {
        if (index < tasks.length - 1) {
            const latestTasks = [...tasks];
            [latestTasks[index + 1], latestTasks[index]] = [latestTasks[index], latestTasks[index + 1]];
            setTasks(latestTasks);
        }
    }

    return (
        <div className="todo">
            <h1>ToDo List</h1>
            <div>
                <input type="text" placeholder='Enter task here...' value={newTask} onChange={InputChange} onKeyPress={EnterKeyPress} />
                <button className='add-button' onClick={AddTask}>Add Task</button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <div className='text'>{task}</div>
                        <button className='complete-button' onClick={() => RemoveTask(index)}>Completed</button>
                        <button className='move-button' onClick={() => MoveUp(index)}>Up</button>
                        <button className='move-button' onClick={() => MoveDown(index)}>Down</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;