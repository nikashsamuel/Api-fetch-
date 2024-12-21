import React, { useState } from 'react'
import{deleteTask,editTask} from '../slices/Dailytask'
import { useDispatch,useSelector } from 'react-redux'
import './Display.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Display = () => {
    const task = useSelector((state) => state.dailyTaskData.tasks)
    const dispatch = useDispatch();

    const[editIndex,setEditIndex] = useState(null);
    const[editvalue,setEditValue] = useState('');

    const handleSaveEdit=(index)=>{
      dispatch(editTask({index,updatedTask:{text:editvalue}}));
      setEditIndex(null);
      setEditValue('');
    }
  return (
    <div className="task-list-container">
      {task.length > 0 ? (
        <ul className="task-list">
          {task.map((task, index) => (
            <li key={index} className="task-item">
              {editIndex === index ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editvalue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div className='task-actions-edit'>
                  <button onClick={() => handleSaveEdit(index)}>Save</button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="task-content">
                  <span>{task.text}</span>
                  <div className="task-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditIndex(index);
                        setEditValue(task.text);
                      }}
                    >
                    
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => dispatch(deleteTask(index))}
                    >
                      
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className='no-task-content'>No tasks available</p>
      )}
    </div>
  );
};


export default Display