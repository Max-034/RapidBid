import { useState } from 'react'
import TextField from "@mui/material/TextField"
import axios from "axios"
import { Link , Navigate , redirect} from 'react-router-dom';
import { Button } from '@mui/material';


export default function Signup()
{

    const [user , setUser] = useState("");
    const [pass , setPass] = useState("");
    const [log , setLog] = useState(false);

    const handle = async(event) => {

        event.preventDefault();
        try{
                 const respo =  await axios.post('http://localhost:3000/register' , {
                   username: user ,
                   password: pass
           } , {withCredentials: true} , 
           {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
           

           if(respo.data === "success")
           {
            console.log(respo.data);
            setLog(true);
              
           }
           else{
            alert(respo.data);
           }



          }
        catch(error)
          {
             console.error(error);
          }
}

    return(
        log ? <Navigate to = '/login' /> :
        <div>  
        <form onSubmit={handle}>
             <TextField id="username" label="Username" variant="outlined" value = {user} onChange={(e) => {setUser(e.target.value)}} />
             <br></br>
            <TextField id="password" label="password" variant="outlined" value = {pass} onChange={(e) => {setPass(e.target.value)}} />
            <br></br>
            <input type = "submit" ></input>  
        </form>
        <Link to = '/login'>
        <Button variant="text">Login</Button>
        </Link>
        </div>
    )
}