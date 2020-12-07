require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require("cors");

//my Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");

//DBConnection
mongoose.connect(process.env.DATABASE,
 {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,}).then(() => {
        console.log("DB CONNECTED");
        
    });

    //middlewares
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

   //My Routes

   app.use("/api/dulam", authRoutes);
   app.use("/api/dulam", userRoutes);
   app.use("/api/dulam", categoryRoutes);

 //Port
 const port = process.env.PORT || 8000;

 //Starting a Server
 app.listen(port, () => {
console.log(`app is running at ${port}`);

 })