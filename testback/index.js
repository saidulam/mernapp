const express = require("express");

const app = express();
const port = 5000
  
app.get('/homepage', (req, res) =>{
    return res.send('welcome to home page');
});

const admin = (req, res) => {
    return res.send("welcome admin")
}

const isAdmin = (req, res, next)  => {
console.log("isAdmin is running up");
 
next();
}
//we can craft code that if isAdmin is true then only next() will be returned otherwise we stop the request!!
const isloggedIn = (req, res, next) => {
    console.log("isloggedIn is running");
    next();
    
}


app.get( "/admin", isloggedIn, isAdmin, admin);

app.get('/contact', (req, res) =>{
    return res.send('welcome to contactus page');
});


app.get('/signout', (req, res) =>{
    return res.send('user signed out');
});

app.get('/hitesh', (req, res) =>{
    return res.send('hitesh uses instagram');
});
app.get('/signin', (req, res) =>{
    return res.send('user logged in');
});

app.listen(port, () =>{
    console.log('server is running up');
    
});

//const port = 3000

//app.get('/', (req, res) => res.send('Hello World!'))

//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))