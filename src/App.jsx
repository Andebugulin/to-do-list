import React, { useState } from 'react';

const TaskFrame = ({ children }) => (
  <div style={{
    margin: '10px',
    padding: '10px',
    border: '1px solid #212020',
    borderRadius: '5px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#000a0b'
  }}>
    {children}
  </div>
);

const EditSign = ({ onEdit }) => (
  <img src="src/edit.png" alt="Edit" onClick={onEdit} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
);

const DeleteSign = ({ onDelete }) => (
  <img src="src/trash_bin.png" alt="Delete" onClick={onDelete} style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
);

const AccomplishedSign = ({ completed, onToggle }) => (
  completed ? (
    <img src="src/incomplete.png" alt="Complete" onClick={onToggle} style={{ width: '30px', height: '30px', cursor: 'pointer'}} />
  ) : (
    <img src="src/complete.png" alt="Incomplete" onClick={onToggle} style={{ width: '30px', height: '30px', cursor: 'pointer'}} />
  )
);

const AddTaskForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting task: ${inputValue}`);
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a task"
        required 
        style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
      />
      <button type="submit" style={{ padding: '10px 15px', borderRadius: '4px', backgroundColor: '#242331', color: 'white', border: 'none', cursor: 'pointer' }}>
        Add Task
      </button>
    </form>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    console.log(`Adding task: ${taskText}`);
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
  };

  const editTask = (taskId, newText) => {
    console.log(`Editing task ${taskId}: ${newText}`);
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, text: newText } : task
    ));
  };

  const deleteTask = (taskId) => {
    console.log(`Deleting task ${taskId}`);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    console.log(`Toggling completion status of task ${taskId}`);
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div style={{ 
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#010409',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'absolute',  
      top: '0',          
      left: '50%',
      transform: 'translateX(-50%)',
    }} >
      
      <h1 style={{ textAlign: 'center', color: '#333' }}>To-Do List</h1>
      <AddTaskForm onAdd={addTask} />
      {tasks.map((task) => (
        <TaskFrame key={task.id}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AccomplishedSign completed={task.completed} onToggle={() => toggleComplete(task.id)} />
            </div>
            <div style={{ marginTop: '10px', padding: '5px', borderRadius: '4px', backgroundColor: task.completed ? '#4CA33333' : '#411', flexGrow: 1, marginLeft: '10px', marginBottom: '10px' }}>
              {task.text}
            </div>
            <div style={{ display: 'flex', alignItems: 'right', marginLeft: '10px' }}>
            <EditSign onEdit={() => editTask(task.id, prompt('Edit your task:', task.text))} />
              <DeleteSign onDelete={() => deleteTask(task.id)} />
              </div>
          </div>
        </TaskFrame>
      ))}
    </div>
  );
};

export default App;