import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/login.jsx';
import App from './App.jsx'
import './index.css'
import Nav from './routes/homepage.jsx';
import Dashboard from './routes/dashboard.jsx';
import Trade from './routes/trades.jsx';
import Auth from './routes/rapidbid.jsx';
import Cookie from 'js-cookie';
import Lp from './routes/rapidbid.jsx';
import Signup from './routes/signup.jsx';
import axios from 'axios';

// const getaccess= () => {
//   const repo =  axios.get('http://localhost:3000/auth' , {withCredentials: true});
//   return repo;
  
// }

// const isAuthenticated = async () => {

//   console.log(getaccess())
  
//   return !!getaccess();

// }



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />

  </React.StrictMode>,
)
