async function fetchAndProcess(e) {

  let sorted
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
      sorted = groupedWithCompleted.toSorted((a, b) => {
        return b.completed - a.completed
      })

    //   // Set state for todosByUser.
    //   setTodosByUser(sorted)
    })
}

module.exports = fetchAndProcess