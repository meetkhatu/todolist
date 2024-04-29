import './App.css';
import React, { useState } from 'react'
import axios from 'axios'

function Create() {

  const [task,setTask]=useState('')
  const handleAdd = () => {
    axios.post( 'http://localhost:8000/add' , {task:task})
    .then(result =>{
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='Create'>
      <input type='text' placeholder='Enter Task' onChange={(e)=>{setTask(e.target.value)}} />
      <button type='button' onClick={ handleAdd }>Add</button> 
    </div>
  )
}

export default Create