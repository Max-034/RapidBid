import express from "express";
import { createClient } from '@supabase/supabase-js'
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import multer from "multer";
import { decode } from "base64-arraybuffer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const supabase = createClient('https://qhryeiuegymozsriktoh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFocnllaXVlZ3ltb3pzcmlrdG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzczODEsImV4cCI6MjAzMTExMzM4MX0.e-dm_pqJ6blrjPe8dTqtSuGv24cRnbA3aYfQtKt_N6E')
const app = express();
const saltr = 10;

app.use(session({
    secret: "parth",
    resave: false,
    saveUninitialized: true,


}));


app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

app.post("/register" , async (req,res) =>
{
    const user = req.body.username;
    const pass = req.body.password;

    bcrypt.hash(pass, saltr, async function(err, hash) {
        const { data, error } = await supabase
    .from('Users')
    .insert([
      { username: user, password: hash },
    ])
    .select()

    var userr = await supabase
    .from('Users')
    .select()
    .eq('username', user);

    userr = userr.data[0];

    req.login(userr, (err) => {
      console.log("success");
      res.redirect("/register");
    });

    });
   
    
console.log(user);

})

app.get("/register" , async (req,res) =>
{
    if (req.isAuthenticated()){
        res.send(req.user);
    }
    else{
        res.send("ge");
    }
})

const array = [
    
    {name: 'item' , maxCount: 1}
]

// app.post("/test" , upload.fields(array), async (req, res, next) =>
//     {
//         const filee = req.files.item[0];

//         const fileBase64 = decode(filee.buffer.toString("base64"));
        
//         const { data, error } = await supabase
//   .storage
//   .from('image')
//   .upload( 'item1/f.png' , fileBase64, {
//     contentType: "image/png",
//   })



  

//   res.send(user.password);


  
// })


app.post("/login",
    passport.authenticate("local", {
      successRedirect: "/register",
      failureRedirect: "/login",
    })
  );


  app.post("/new-item" , upload.fields(array) , async(req , res , next) =>
{
    if(req.isAuthenticated())
        {
    const file = req.files.item[0];
    const fileBase64 = decode(file.buffer.toString("base64"));
    const { data, error } = await supabase.storage.from('image').upload( '/' + req.user.username + '/item' + req.user.items + '/item.png' , fileBase64, {contentType: "image/png",})
    await supabase.storage.from('image').upload( '/' + req.user.username + '/item' + req.user.items +'/desc.txt'  , req.body.desc);
    await supabase.storage.from('image').upload( '/' + req.user.username + '/item' + req.user.items +'/name.txt'  , req.body.name);
    await supabase.storage.from('image').upload( '/' + req.user.username + '/item' + req.user.items +'/basep.txt'  , req.body.basep);


    await supabase.from('Users').update({ items: req.user.items++ }).eq('username', req.user.username).select()
        

    res.send(req.files.item[0])
        }
        else
        {
            res.redirect('/login')
        }

})







  passport.use(
    new Strategy(async function verify(username, password, cb) {
      try {
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
              return cb(err);
            } else {
              if (valid) {
                return cb(null, user);
              } else {
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
  
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

app.listen(3000 , () => 
{
    console.log("o7");
})