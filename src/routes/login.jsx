import { useState , useEffect } from 'react'
import TextField from "@mui/material/TextField"
import axios from "axios"
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { redirect } from "react-router-dom";







export default function Login({log , lo}) 
{
    

     const [user , setUser] = useState("");
    const [pass , setPass] = useState("");
    const [auth , setAuth] = useState(true);
    const[loading , setLoading] = useState(true);
   
    const handle = async(event) => {
        event.preventDefault();
        try{
                 const respo =  await axios.post('http://localhost:3000/login' , {
                   username: user ,
                   password : pass
           } , {withCredentials: true},
           {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
           );

           if(respo.data.user)
           {
            log();
            setAuth(false);
            //etLoading(false);
            
            
            console.log(auth);
        //    return redirect('/dashboard')
           }
           else{
            alert("invalid");
           }


          }
        catch(error)
          {
             
          }

        //   if(loading)
        //   {
        //     return (
        //         <div>loading...</div>
        //     )
        //   }
}



    return(

        !lo ? 

        <div>

       

        <form onSubmit={handle}>
             <TextField id="username" label="Username" variant="outlined" value = {user} onChange={(e) => {setUser(e.target.value)}} />
             <br></br>
            <TextField id="password" label="password" variant="outlined" value = {pass} onChange={(e) => {setPass(e.target.value)}} />
            <br></br>
            <input type = "submit" ></input>
        </form>

       
      <Link to = '/signup'>
        <Button variant="text">Signup</Button>

        </Link>
      

        



        </div>

        : <Navigate to = '/homepage/trades' />
        
    )




}