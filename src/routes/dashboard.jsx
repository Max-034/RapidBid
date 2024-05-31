import { Navigate } from 'react-router-dom';


export default function Dashboard({auth , user})
{
    return (
        auth ? <div>o {user}</div> : <Navigate to = '/login' />
    )
}


