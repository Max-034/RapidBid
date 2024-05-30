import {io} from 'socket.io-client';


export const Socket = io('http://localhost:3000' , {autoConnect: true},{

    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"

    }
    });



