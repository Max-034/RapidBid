import {useState , useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Socket} from '../socket.jsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Countdown from 'react-countdown';






   

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Trade({auth , user}) {

      const [ms , setMs]= useState([]);

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

  auth ? 
    <Box sx={{ flexGrow: 1  , margin: 2}}>
      <Grid container justifyContent={'space-evenly'} spacing={2}>

      {ms.map((elem  , index) => (

        <Grid item xs = {6}>
        <Item>
        <div className='trade'>

        <img src = {elem.path} ></img>
        <p> {elem.name}</p>
        <br></br>
        <p>{elem.desc}</p>
        <br></br>
        <p>{elem.basep}</p>
        <br></br>
        <div>
        <Countdown date={elem.duration} />
        </div>
        
        
        </div>
        
        
        </Item>
        </Grid>

      ))}



        {/* <Grid item xs={6}>
          <Item>
          <div className='trade'>

          <img src = {ms[0].path} ></img>
          
          </div>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=8</Item>
        </Grid> */}
      </Grid>
    </Box>
    :  <Navigate to = '/login' />



  );
}





