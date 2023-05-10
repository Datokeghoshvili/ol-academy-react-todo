import React from 'react';

import { useState } from 'react';
function Todo() {
const [text, setText] = useState('');
const [tasks, setTasks] = useState([]);
const [errorMessage, setErrorMessage] = useState('');

function handleChange(event) {
setText(event.target.value);
setErrorMessage('');
}

function handleAdd(){
const taskNames = tasks.map(function(task) { 
  return task.name; 
}); 
  if (!text) {
    setErrorMessage(' enter a task!.');
  } else if (taskNames.includes(text)) {
    setErrorMessage('text:-> "' + text + '" already exists.');
  } else {
    setTasks([...tasks, { name: text, completed: false, editMode: false, checked: false }]);
    setText('');
    setErrorMessage('');
  }
}
function handleDelete(index) {
const newTasks = [...tasks];
newTasks.splice(index, 1);
setTasks(newTasks);
}

function handleComplete(index) {
const newTasks = [...tasks];
newTasks[index].completed = !newTasks[index].completed;
setTasks(newTasks);
}

function handleEdit(index) {
const newTasks = [...tasks];
newTasks[index].editMode = true;
setTasks(newTasks);
}

function handleSave(index, newName) {
const newTasks = [...tasks];
newTasks[index].name = newName;
newTasks[index].editMode = false;
setTasks(newTasks);
}

function handleCheckbox(index) {
const newTasks = [...tasks];
newTasks[index].checked = !newTasks[index].checked;
setTasks(newTasks);
}

function handleMoveUp(index) {
if (index > 0) {
const newTasks = [...tasks];
const temp = newTasks[index];
newTasks[index] = newTasks[index - 1];
newTasks[index - 1] = temp;
setTasks(newTasks);
}
}

function handleMoveDown(index) {
if (index < tasks.length - 1) {
const newTasks = [...tasks];
const temp = newTasks[index];
newTasks[index] = newTasks[index + 1];
newTasks[index + 1] = temp;
setTasks(newTasks);
}
}

function handleDeleteAll() {
  setTasks([]);
}

function handleDeleteCompleted() {
const newTasks = tasks.filter(task => !task.completed);
setTasks(newTasks);
}

function handleDeleteChecked() {
const newTasks = tasks.filter(task => !task.checked);
setTasks(newTasks);
}


return (
  <div className='displayerdiv'>
  <div className='divforinputtbtn'>
  <h1 id='h1'>TodoApp</h1>
  
<input className='input'
     type="text"
     id="textInput"
     value={text}
     onChange={handleChange}
     placeholder='Write text here'
   />
<button id='addbtn' onClick={handleAdd}>Add</button>
<button id='delbtn' onClick={handleDeleteAll}>Delete All</button>
<button id='checkedtaskbtn' onClick={handleDeleteChecked}>Delete marked Tasks</button>
<button id='savedtaskbtn' onClick={handleDeleteCompleted}>Delete finished Tasks</button>
{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
<ul>
{tasks.map((task, index) => (
  <li key={index}style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'red' : 'black' }}>
{!task.editMode ? (
  <div>
<input type="checkbox" checked={task.checked} onChange={() => handleCheckbox(index)} />
{task.name}
<button className='markfinish' onClick={() => handleComplete(index)}>Mark finished</button>
<button className='markedit' onClick={() => handleEdit(index)}>Edit</button>
<button className='deletebtn' onClick={() => handleDelete(index)}>delete</button>
<button className='UP' onClick={() => handleMoveUp(index)}>Up</button>
<button className='DOWN' onClick={() => handleMoveDown(index)}>Down</button>
              </div>
            ) : (
              <div>
                <input   type="text" defaultValue={task.name} onBlur={(x) => handleSave(index, x.target.value)} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
        </div>
  );
}

export default Todo;