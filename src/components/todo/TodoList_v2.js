import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function newID() {
  let id = 0;
  return () => id++;
}
const INITIAL_TASKS = [
  { id: newID(), label: 'Walk the dog' },
  { id: newID(), label: 'Water the plants' },
  { id: newID(), label: 'Wash the dishes' },
];

const TodoList = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h1>Todo List</h1>
      <form onSubmit={(event) => {
          event.preventDefault();
          if (newTask.trim() === '') {
            return;
          }
          setTasks([...tasks, {id: newID(), label: newTask}]);
          setNewTask('');
        }}>
        <div>
          <input
            type="text"
            aria-label="Add your task"
            placeholder="Add your task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div>
            <button>Submit</button>
          </div>
        </div>
      </form>
      {tasks.length === 0 ? (
        <div>No tasks added</div>
      ) : (
      <ul>
       {tasks.map((task, index) =>  (
          <li key={index}>
            <span>{task.label} </span>
            <button onClick={() => setTasks(tasks.filter((item) => item.id !== task.id))}>Delete</button>
          </li>
        ))
       }
      </ul>
      )}
    </div>
  );
}


export default TodoList;
