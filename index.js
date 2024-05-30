import express from "express";
import { createClient } from '@supabase/supabase-js'
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import multer from "multer";
import { decode } from "base64-arraybuffer";
import cors from "cors";
import morgan from "morgan";
import { createServer } from 'node:http';
import { Server } from 'socket.io';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const supabase = createClient('https://qhryeiuegymozsriktoh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFocnllaXVlZ3ltb3pzcmlrdG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzczODEsImV4cCI6MjAzMTExMzM4MX0.e-dm_pqJ6blrjPe8dTqtSuGv24cRnbA3aYfQtKt_N6E')
const app = express();
const server = createServer(app);
const saltr = 10;

const corop = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corop));

const io = new Server(server , {
  cors: {

     origin: 'http://localhost:5173',
    credentials: true

  }
});





io.on('connection' , async (socket) => {


let { data: trades, error } = await supabase
  .from('trades')
  .select('*')

  //console.log(trades);

  io.emit('chat' , 'hi')

  io.emit('trades' , trades);

 

  });

   
const handleInserts = async (payload) => {
  // console.log('Change received!', payload)
  let { data: trades, error } = await supabase
  .from('trades')
  .select('*')

  console.log(trades);

  io.emit('trades' , trades);
  
}


supabase
  .channel('trades')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'trades' }, handleInserts)
  .subscribe()





// Middleware

const sessionmiddleware = session({
    secret: "parth",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
    } , 
  
});



app.use(sessionmiddleware);

function isAuthenticated (req, res, next) {
  if (req.session.user) {console.log("oh"); next(); }
  else {res.send("chal hat")}
}

// io.engine.use(sessionmiddleware);

app.use(bodyParser.json({ extended: true }));
app.use(express.urlencoded({
    extended: true
}))

app.use(morgan('combined'));








app.get('/' , (req,res) => {
  res.send("okay");
})

app.get('/trade' , async (req,res) => 
{
  let { data: trades, error } = await supabase
  .from('trades')
  .select('*')

  res.send(trades);

})




app.post("/register" , cors(corop) ,  async (req,res) =>
{
    try
    {
    const user = req.body.username;
    const pass = req.body.password;

     const data = await supabase
        .from('Users')
        .select()
        .eq('username', user);

        console.log(data);

    if(data.data.length > 0)
    {
       res.send("fail");
    }    
    else{

    bcrypt.hash(pass, saltr, async function(err, hash) {
        const { data, error } = await supabase
    .from('Users')
    .insert([
      { username: user, password: hash },
    ])
    .select()

    res.send("success");



    });

    }

}
catch(err)
{
   
}
   
    


})

app.get("/axios" , async(req,res) => {

  //   const { data} = supabase
  // .storage
  // .from('image')
  // .getPublicUrl('image/front/item0/item.png');

  // res.send(data);
  // console.log((req.session.user.items));

  // req.session.user.items= req.session.user.items++;

  // console.log(req.session.user.items);
  


console.log(req.session.user)
res.send("theek");
  

})






app.get("/register" , async (req,res) =>
{
  res.send("hm");
})

const array = [
    
    {name: 'item' , maxCount: 1}
]



  app.post("/new-item" , isAuthenticated , upload.fields(array) , async(req , res , next) =>
{

    const file = req.files.item[0];
    const fileBase64 = decode(file.buffer.toString("base64"));
    await supabase.storage.from('image').upload( '/' + req.session.user.username + '/item' + req.session.user.items + '/item.png' , fileBase64, {contentType: "image/png",})


    const { data } = supabase
  .storage
  .from('image')
  .getPublicUrl('/' + req.session.user.username + '/item' + req.session.user.items + '/item.png');

  
   await supabase
  .from('trades')
  .insert([
    { path: data.publicUrl, desc: req.body.desc , basep: req.body.basep , name: req.body.name },
  ])
  .select()


    await supabase.from('Users').update({ items: req.session.user.items + 1 }).eq('username', req.session.user.username).select();
    req.session.user.items = req.session.user.items + 1;
    console.log(req.session.user.items);

    res.send("bhaiyar")
        
    
        

})

app.get('/auth' , async(req , res) => {

  console.log(req.session);
  if(req.session.user)
  {
    res.send({user: req.session.user});
  }
  else{
     res.send("fail")
  }
})







        app.post('/login' , async(req,res) => {

          req.session.regenerate(function (err) {
          if (err) next(err)
          })

          const {username , password} = req.body;


          console.log(username);
        const result = await supabase
        .from('Users')
        .select()
        .eq('username', username);

        if (result.data.length > 0) {
          const user = result.data[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              res.redirect('/axios');
            } else {
              if (valid) {
                req.session.user = user;
                req.session.save(function(err) {
  // session saved
})
                
                console.log("hmm");
                res.send(req.session);
              } else {
                console.log("wtf");
                res.send(req.session);
              }
            }
          });
        } else {
          console.log("bhag be");
          res.redirect('/axios');
        }

        })
       

server.listen(3000 , () => 
{
    console.log("o7");
})