 const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const {user} = require("../routes/auth");

//Signup Cotroller
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].param
    });
  }

  // saving user to db
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return
      res.status(400).json({
        err: "NOT able to save user",
      });
    }
    res.json({name:user.name,
    email:user.email,
  id:user._id});
  });
};

//signin controller
exports.signin = (req, res) => {
  const {email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0],
    });
  }
  User.findOne({email}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exist",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        Error: "Email & Password does not Match",
      });
    }
    //create token
    var token = jwt.sign({ id: user._id}, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, {expire: new Date() + 9999
    });
    //send Response to frontend
    const { _id, name, email, role} = user;
    return res.json({ token, user: { _id, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "user signed out sucsessfully",
  });
};

//protected Routes

exports.isSignedin = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});


//Custom Middleware for Authentication
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth.id
  if (!checker) {
     res.status(403).json({error: "Access Denied"});
     


  }
  next();
};

//Custom Middleware for isAdmin

exports.isAdmin = (req, res, next) => {
  if (req.profile._id === 0) {
    res.status(403).json({
      error: "you are not ADMIN"
    });
  }
  next();
};
 


    
  
