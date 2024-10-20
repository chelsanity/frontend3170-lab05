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

  return (
    <div className="container">
      <h1>daily planner</h1>
      <TaskForm addTask={addTask} />
      <h3>{tasks.filter(task => !task.isCompleted).length} tasks remaining</h3>
      <div className="task-list">
        {tasks.map((task) => (
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
