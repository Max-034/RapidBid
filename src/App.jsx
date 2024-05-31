import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './routes/login.jsx';
import './index.css'
import Nav from './routes/homepage.jsx';
import Dashboard from './routes/dashboard.jsx';
import Trade from './routes/trades.jsx';
import Lp from './routes/rapidbid.jsx';
import Signup from './routes/signup.jsx';
import axios from 'axios';
import {useState , useEffect} from 'react';


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [user , setUser] = useState("");

    useEffect(() => {
   
        axios.get('http://localhost:3000/auth', { withCredentials: true })
        .then((response) => {
          console.log(response)
        if(response.data.user)
        {
          setIsLoggedIn(true);
          setLoading(false);
          setUser(response.data.user.username);

        }
        else{
          setLoading(false);
        }
        
        })
  
    }, []); 

        if (isLoading) {
    return <div className="App">Loading...</div>;
  }


return (
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lp />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login log = {setIsLoggedIn} lo = {isLoggedIn} usern = {setUser}/>} />

        <Route path='/homepage' element= {<Nav auth = {isLoggedIn} user = {user} />} >
        <Route path='dashboard' element= {<Dashboard auth = {isLoggedIn} user = {user} />} />
        <Route path='trades' element= {<Trade auth = {isLoggedIn} user = {user} />} />
        </Route >
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
