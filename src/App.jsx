import { useState } from 'react'
import './App.css'
import BarChart from './BarChart'
import UserCards from './UserCards'


// App component.
function App() {

  // Hooks
  // 
  // State for fetched and processed data.
  const [todosByUser, setTodosByUser] = useState([])

  // State for button and preloader.
  const [loading, setLoading] = useState({ btnDisabled: false, preloader: "" })

  // Helper function
  async function fetchItems(e) {

    // Disable button and show preloader.
    setLoading({ btnDisabled: true, preloader: "preloader" })

    // Prevent default form submission behaviour.
    e.preventDefault()

    // Create a variable for fetched data.
    const data = []

    // Fetch todos from url.
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {

        // Store todos grouped by userId in groupedByUser.
        const groupedByUser = data.reduce((groupedUsers, obj) => {
          const userId = obj.userId
          if (!groupedUsers[userId]) groupedUsers[userId] = []
          groupedUsers[userId].push(obj)
          return groupedUsers
        }, []).slice(1)

        // Create object with arrays of users and completed/notCompleted count.
        const groupedWithCompleted = groupedByUser.map(user => {
          const completed = user.filter(todo => todo.completed).length
          const notCompleted = user.filter(todo => !todo.completed).length
          return { data: [...user], completed, notCompleted }
        });

        // Store sorted arrays of users by completed in descending order in sorted.
        const sorted = groupedWithCompleted.toSorted((a, b) => {
          return b.completed - a.completed
        })

        // Set state for todosByUser.
        setTodosByUser(sorted)
      })

    // Enable button and hide preloader.
    setLoading({ btnDisabled: false, preloader: "" })
  }


  // Retrun components.


  return (
    <>
      <div id='main'>

        {/* Button. */}
        <form id='form' onSubmit={fetchItems}>
          <button autoFocus={true} disabled={loading.btnDisabled} id="btn">Fetch Data</button>

          {/* Preloader */}
          <div id={loading.preloader}></div>
        </form>

        {/* User cards. */}
        <div id='container'>
          <UserCards todosByUser={todosByUser} />
        </div>

        {/* Bar Chart */}
        <BarChart todosByUser={todosByUser} />

      </div>
    </>
  )
}


export default App
