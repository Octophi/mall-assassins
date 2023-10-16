import React from 'react';

export const NewTask = () => {
    return(
        <form className='TaskForm'> 
            <input type="test" className='task-input'
            placeholder='Enter your task here'/>
            <button type='submit' className='task-btn'>Add Task</button>
        </form>
    )
}