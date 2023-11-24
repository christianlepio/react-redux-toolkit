import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//css
import 'bootstrap/dist/css/bootstrap.css' //import bootstrap css
import 'bootstrap-icons/font/bootstrap-icons.css' //import bootstrap icon
import 'bootstrap/dist/js/bootstrap.bundle.js' //import bootstrap js

//redux state management provider
import { Provider } from 'react-redux'
import { store } from './app/store'

//load users when the app starts running
import { fetchUsers } from './features/users/usersSlice'
//load posts when the app starts running (holds RTK query)
import { extendedApiSlice } from './features/posts/postsSlice'

//we can do this syntax (w/dispatch) because we have directly access to store
              //initiate method getPosts from endpoints of extended api slice
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())
store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*wrapping the app within the Provider 
       Provider is required when working with redux 
       store props here is a global state that will be available to the app */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
