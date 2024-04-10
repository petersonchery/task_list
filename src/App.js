import React, { useState } from 'react';
import { TrashIcon, RefreshIcon } from '@heroicons/react/outline';
import 'tailwindcss/tailwind.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="bg-blue-500 text-white font-semibold mb-4 text-center">Task List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="w-full border rounded py-2 px-3 mr-2"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between border-b py-2 ${
              task.completed ? 'text-gray-500 line-through' : ''
            }`}
          >
            <span>{task.text}</span>
            <div>
              <button
                className="mr-2 text-green-500"
              >
                {task.completed ? (
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-4 text-blue-500"
                    checked={true}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-4 text-blue-500"
                    checked={false}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                )}
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteTask(index)}
              >
                <TrashIcon className="h-6 w-4" />
              </button>
              <button
                className="text-green-500"
                onClick={() => {
                  const newText = prompt('Enter new title of this task');
                  if (newText !== null) {
                    updateTask(index, newText);
                  }
                }}
              >
                <RefreshIcon className="h-6 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
