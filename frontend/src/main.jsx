import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { SocketProvider } from './context/Socket.jsx'
// import { AuthProvider } from './context/AuthContext.jsx';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <SocketProvider>
      <AuthProvider>
    <App />
    </AuthProvider>
    </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>,

)
