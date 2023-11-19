import AppRoutes from "./components/AppRoutes"
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default App
