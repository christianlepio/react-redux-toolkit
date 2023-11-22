import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//css
import 'bootstrap/dist/css/bootstrap.css' //import bootstrap css
import 'bootstrap-icons/font/bootstrap-icons.css' //import bootstrap icon
import 'bootstrap/dist/js/bootstrap.bundle.js' //import bootstrap js

//RTK query provider from redux toolkit
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { apiSlice } from './features/api/apiSlice.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* wrapping the app component with the RTK ApiProvider
        ApiProvider is required when working with RTK
        pass apiSlice to api props of ApiProvider */}
    <ApiProvider api={apiSlice}>
      <App /> {/* app component can now have access to methods/hooks in apiSlice */}
    </ApiProvider>
  </React.StrictMode>,
)
