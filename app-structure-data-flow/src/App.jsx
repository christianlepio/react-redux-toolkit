//components
import AddPostForm from "./components/AddPostForm"
import PostsList from "./components/PostsList"

function App() {

  return (
    <>
      <div className="container mt-5">
        <div className="d-block justify-content-center mx-5 px-5">
          <AddPostForm />
          <PostsList />
        </div>
      </div>
    </>
  )
}

export default App
