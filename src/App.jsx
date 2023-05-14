import { useState } from 'react'
import './App.css'
// Components.
import Button from './Button'
import UserCards from './UserCards'
import BarChart from './BarChart'
// Helper function fetching data from url.
import fetchAndProcess from './fetchAndProcess.js'


// App component.
function App() {

  // State for fetched and processed data.
  const [todosByUser, setTodosByUser] = useState([])
  // State for button and preloader.
  const [loading, setLoading] = useState({ btnDisabled: false, preloader: "" })

  async function fetchItems() {

    // Disable button and show preloader.
    setLoading({ btnDisabled: true, preloader: "preloader" })

    // Store sorted by number of completed todos in descending order arrays of users.
    const sorted = await fetchAndProcess()

    // Set todosByUser state to sorted.
    setTodosByUser(sorted)

    // Enable button and hide preloader.
    setLoading({ btnDisabled: false, preloader: "" })
  }

  // Return components.
  return (
    <>
      <Button loading={loading} fetchItems={fetchItems} />
      <div id="container">
        <UserCards todosByUser={todosByUser} />
      </div>
      <BarChart todosByUser={todosByUser} />
    </>
  )
}

export default App
