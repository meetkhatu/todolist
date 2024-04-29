import './App.css';
import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs'

function Home() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  },[])

  const handleEdit = (id) => {
    axios.put('http://localhost:8000/update/'+id)
    .then(result => {
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    })
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:8000/delete/'+id)
    .then(result => {
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='Home'>
      <h1>ToDo List</h1>
      <Create />
      {
        todos.length === 0
          ?
          <h2>No Record</h2>
          :
          todos.map(todo => (
            <div className='task'>
              <div className='checkbox' onClick={() => handleEdit(todo._id) }>
                { todo.done
                  ?
                  <p><BsFillCheckCircleFill className='icon' /><span id="line-through" >{todo.task}</span></p>
                  :
                  <p><BsCircleFill className='icon' />{todo.task}</p>
                }
              </div>
              <div>
                <span><BsFillTrashFill className='icon' onClick={ () => handleDelete (todo._id) } /></span>
              </div>
            </div>
          )
          )
      }
    </div>
  )
}

export default Home
