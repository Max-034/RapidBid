import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Lp()
{


    return (
        <div>
        
        <h1>RapidBid</h1>

        <Link to = '/signup'>

        <Button variant="text">Get Started</Button>
        
        </Link>

        {/* <Link to = '/preview'>

        <Button variant="text">Live Trades</Button>

        </Link> */}

        
        </div>
        
    )

}