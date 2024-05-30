import { useState, useEffect} from 'react'
import {Socket} from '../socket.jsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';




export default function Dashboard({auth , user})
{
    return (

        auth ? <div>o bale bale {user}</div> : <Navigate to = '/login' />
    )
}

