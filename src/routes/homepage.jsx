import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MailIcon from '@mui/icons-material/Mail';
import './new.css';
import { Navigate, useNavigate , Link } from 'react-router-dom';
//import Login from '../login';
import { Outlet } from "react-router-dom";
//import {Socket} from '../socket.js';
import axios from 'axios';
import {useCookies}   from 'react-cookie';





export default function Nav({auth , user}) {
  const [open, setOpen] = React.useState(false);
  

const [cookies, setCookie, removeCookie] = useCookies(['connect.sid']);






  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const DrawerList = (


    

    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[{text: "Dashboard" , link: "/homepage/trades"}, {text: "Dashboard" , link: "/Dashboard"} , {text: "Dashboard" , link: "/Dashboard"}, {text: "Dashboard" , link: "/Dashboard"}].map((text, index) => (
            <Link to={text.link}>
          <ListItem key={text.text} disablePadding>
            <ListItemButton >
              <ListItemIcon>
              {index === 0 ? <DashboardIcon /> : null}
              {index === 1 ? <CurrencyExchangeIcon /> : null}
              {index === 2 ? <AccountBalanceWalletIcon /> : null}
                {index === 3 ? <MailIcon /> :null }
              </ListItemIcon>
              <ListItemText primary={text.text} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>

      <input type = 'submit' onClick={() => removeCookie({path: '/'})}></input>
  
      </List>
    </Box>
  );

  return (

    auth ? 

    <Box sx={{display: 'flex' , flexDirection: 'column' , margin: 2}}>
      <Button sx = {{alignSelf: 'flex-start'}}onClick={toggleDrawer(true)}>Open</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Outlet />
    </Box>
    


    : <Navigate to  = '/login'/> 
  );
}
