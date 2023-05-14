export default async function fetchAndProcess() {

  // Create a variable for fetched data.
  let data = []

  // Fetch todos from url.
  await fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json())
    .then(fetchedData => data = fetchedData)

  // Store todos from data and group them by userId.
  const groupedByUser = data.reduce((acc, cur) => {
    const userId = cur.userId
    if (!acc[userId]) acc[userId] = []
    acc[userId].push(cur)
    return acc
  }, []).slice(1)

  // Create object with arrays of users and completed/notCompleted count.
  const groupedWithCompleted = groupedByUser.map(user => {
    const completed = user.filter(todo => todo.completed).length
    const notCompleted = user.filter(todo => !todo.completed).length
    return { data: [...user], completed, notCompleted }
  });

  // Return sorted by number of completed todos in descending order arrays of users.
  return groupedWithCompleted.toSorted((a, b) => {
    return b.completed - a.completed
  })
}