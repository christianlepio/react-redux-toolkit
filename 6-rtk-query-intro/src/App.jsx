// before running this app, server should run first!
// type this command on terminal 'npx json-server -p 3500 -w data/db.json' to run the server...
import TodoList from "./features/components/todos/TodoList"

function App() {
  return (
    <>
      <div className="container">
        <div className="my-5">
          <TodoList />
        </div>
      </div>
    </>
  )
}

export default App
