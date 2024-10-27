import React, { useState } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import './App.css';

interface TaskType {
  id: number;
  title: string;
  isCompleted: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<string>('All'); // new filter state

  // my function to add a new task
  const addTask = (title: string) => {
    const newTask = { id: Date.now(), title, isCompleted: false };
    setTasks([...tasks, newTask]);
  };

  // my function to toggle task completion status
  const toggleTask = (taskId: number) => {
    setTasks(
      tasks.map(task => 
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // my function to remove a task
  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // this filters the tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.isCompleted;
    if (filter === 'Pending') return !task.isCompleted;
    return true; // shows all tasks if "All" is selected
  });

  // my filter buttons
  return (
    <div className="container">
      <h1>daily planner</h1>
      <TaskForm addTask={addTask} />
      
      <div className="filter-buttons">
        <button onClick={() => setFilter('All')} disabled={filter === 'All'}>All</button>
        <button onClick={() => setFilter('Completed')} disabled={filter === 'Completed'}>Completed</button>
        <button onClick={() => setFilter('Pending')} disabled={filter === 'Pending'}>Pending</button>
      </div>

      <h3>{filteredTasks.filter(task => !task.isCompleted).length} tasks remaining</h3>

      <div className="task-list">
        {filteredTasks.map(task => (
          <Task 
            key={task.id} 
            task={task} 
            toggleTask={toggleTask} 
            removeTask={removeTask} 
          />
        ))}
      </div>
    </div>
  );
};

export default App;
