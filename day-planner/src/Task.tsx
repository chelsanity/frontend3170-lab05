import React from 'react';

interface TaskProps {
  task: {
    id: number;
    title: string;
    isCompleted: boolean;
  };
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, toggleTask, removeTask }) => {
  return (
    <div className="task">
      <input 
        type="checkbox" 
        checked={task.isCompleted} 
        onChange={() => toggleTask(task.id)} 
        disabled={task.isCompleted} // this disables my checkboxes if task are completed
      />
      <span className={task.isCompleted ? 'completed' : ''}>{task.title}</span>
      <button onClick={() => removeTask(task.id)}>delete</button>
    </div>
  );
};

export default Task;
