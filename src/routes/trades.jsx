import {useState , useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Socket} from '../socket.jsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Countdown from 'react-countdown';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";







   

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Trade({auth , user}) {
     
      const { register, handleSubmit } = useForm();

      const [ms , setMs]= useState([]);
      const [form , setForm] = useState(false);
      const[name , setName] = useState("");
      const[desc , setDesc] = useState("");
      const[basep , setBasep] = useState(0);
      const[ dur , setDur] = useState(0);
  
      

      const onSubmit = async(data) =>
      {
        const formdata = new FormData();
        formdata.append("item" , data.file[0]);
        formdata.append('name' , name);
        formdata.append('dur' , dur);
        formdata.append('basep' , basep);
        formdata.append('desc' , desc);
        setForm(false);


        const res = await axios.post('http://localhost:3000/new-item' , formdata
          
           , {withCredentials: true} , {headers: {'Content-Type': 'multipart/form-data'}}
           );
      }

      

      // const  handleform = async(event) => {
      //   event.preventDefault();

      //   formData.append('item' , img);
      //   formData.append('name' , name);


      //   try{
      //     console.log(formData)
      //     const repo = axios.post('http://localhost:3000/new-item' , {
      //       // name: name,
      //       // desc: desc,
      //       // basep: basep,
      //       // dur: dur,
            
      //       formData
      //     } , {withCredentials: true} , 
      //      );

      //      if(repo)
      //      {
      //       setForm(false);
      //      }



      //   }
      //   catch(error)
      //   {

      //   }



      // }
    


      useEffect(() => {
         axios.get('http://localhost:3000/trade', { withCredentials: true })
        .then((response) => {
         setMs(response.data)
         
      })

}, []);

      

    Socket.on('trades' , (trades) => {
        setMs(trades);
        console.log(trades);
    })

    // const date = new Date();
    // const dur = ms[10].endtime;
    // console.log(dur);



  return (

  auth ? form ? 
  <div>

  <form onSubmit={handleSubmit(onSubmit)}>

  <input type= 'text' id="name" label="Username" variant="outlined" value = {name} onChange={(e) => {setName(e.target.value)}} />
   <input type= 'text'id="desc" label="Username" variant="outlined" value = {desc} onChange={(e) => {setDesc(e.target.value)}} />
   <input type = 'number' id="basep" label="Username" variant="outlined" value = {basep} onChange={(e) => {setBasep(e.target.value)}} />
   <input type = 'number' id="duration" label="Username" variant="outlined" value = {dur} onChange={(e) => {setDur(e.target.value)}} />
    <input type="file" {...register("file")} />

    <input type="submit" />
      </form>

      <input type = 'submit' value = 'go back' onClick={() => setForm(false)} />
  
  </div>
  
  
  
  
  
  
  :
    <Box sx={{ flexGrow: 1  , margin: 2 }}>

     <Button variant="text" onClick = {() => setForm(true)} style={{marginLeft: "1210px"}}>Add Product</Button>
      <Grid container justifyContent={'space-evenly'} spacing={2}>

      {ms.map((elem  , index) => (

        <Grid item xs = {12}>
        <Item>
        <div className='trade'>

        <img src = {elem.path} style={{height: '500px' , width: '550px'}}></img>
        <div className='details'>
        <p> {elem.name}</p>
        <p>{elem.desc}</p>     
        <p style = {{color: "green"}}>The current Bid is {elem.basep}</p>
        <form>
        <input type='number'></input>
        <input type='submit' value='Bid'></input>
        </form>
        </div>

        <div style={{fontSize: '35px'}}>
        <Countdown date={Date.now() + elem.dur*60*60*1000} />
        </div>
        
        
        </div>
        
        
        </Item>
        </Grid>



      ))}

      </Grid>

     
    </Box>

    

    :  <Navigate to = '/login' />



  );
}





