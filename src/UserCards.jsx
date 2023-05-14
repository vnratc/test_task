import "./UserCards.css"

// Variables for User cards.
// 
// Create an array of User cards for the corresponding component below.
export default function UserCards({ todosByUser }) {
  return (
    todosByUser.map((user, i) => {

      // Create empty array for todo items for further use inside every User card.
      let todoItems = []

      return (
        // Create unique key by adding user before the id.
        <div className='user-card' key={`user${user.data[i].userId}`}>

          {/* Card title. */}
          <div className='card-title'>

            {/* user id in the card's left upper corner. */}
            <span>User {user.data[i].userId}</span>

            {/* completed / notCompleted ratio in the card's right upper cornder. */}
            <span>
              <span className='completed'>{user.completed}</span> /
              <span className='notCompleted'> {user.notCompleted}</span>
            </span>
          </div>

          {/* Todo list. */}
          <ul>{todoItems = user.data.map(todo =>
            <li key={todo.id}>
              {todo.title}
            </li>
          )}
          </ul>
        </div>
      )
    })
  )
}