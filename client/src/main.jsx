import React from 'react'
import ReactDOM from 'react-dom/client'

import '/public/Reset.css'

import {App} from './App.jsx'
import {AuthProvider} from './contexts/authContext.jsx'
import { HelmetProvider } from 'react-helmet-async'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)