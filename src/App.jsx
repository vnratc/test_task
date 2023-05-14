import { useState } from 'react'
import './App.css'
import BarChart from './BarChart'


function App() {
  const [todosByUser, setTodosByUser] = useState([])
  const [loading, setLoading] = useState({ btnDisabled: false, preloader: "" })

  async function fetchItems(e) {
    setLoading({ btnDisabled: true, preloader: "preloader" })
    e.preventDefault()
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        // Group all data by userId
        const groupedByUser = data.reduce((groupedUsers, obj) => {
          const userId = obj.userId
          if (!groupedUsers[userId]) groupedUsers[userId] = []
          groupedUsers[userId].push(obj)
          return groupedUsers
        }, []).slice(1)

        // Create obj with "array of users" and "completed" count
        const groupedWithCompleted = groupedByUser.map(user => {
          const completed = user.filter(todo => todo.completed).length
          const notCompleted = user.filter(todo => !todo.completed).length
          return { data: [...user], completed, notCompleted }
        });

        // Sort users
        const sorted = groupedWithCompleted.toSorted((a, b) => {
          return b.completed - a.completed
        })
        setTodosByUser(sorted)
      })
    setLoading({ btnDisabled: false, preloader: "" })
  }


  let todoItems = []
  const userItems = todosByUser.map((user, i) =>
    <div className='card' key={`user${user.data[i].userId}`}>
      <div className='card-title'>
        <span>User {user.data[i].userId}</span>
        <span>
          <span id='completed'>{user.completed}</span> /  
          <span id='notCompleted'> {user.notCompleted}</span>
        </span>
      </div>
      <ul>{todoItems = user.data.map(todo =>
        <li key={todo.id}>
          {todo.title}
        </li>
      )}</ul>
    </div>
  )

  return (
    <>
      <div id='main'>
      <form id='form' onSubmit={fetchItems}>
        <button autoFocus={true} disabled={loading.btnDisabled} id="btn">Fetch Data</button>
        <div className={loading.preloader}></div>
      </form>
      <div id='container'>{userItems}</div>
      <BarChart todosByUser={todosByUser}/>
      </div>
    </>
  )
}


export default App
