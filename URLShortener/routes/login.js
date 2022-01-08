const express = require('express');
const router = express.Router();
const User = require('../models/User');
const alert = require('alert');

router.get('/', async (req, res) => {
  if(req.session.loggedin){
    res.redirect('/landing');
  }else{
    res.render('../views/pages/login.pug');
  }
});

router.post('/', async (req,res)=>{
  try{
    let uname = req.body.username;
    let pword = req.body.password;
    let found = await User.findOne({ username: uname,password: pword });
    if(found){
      req.session.loggedin = true;
      req.session.username = uname;
      req.session.save();
      res.redirect('/landing');
    }else{
      alert('Wrong Login Credentials');
      res.redirect('/login');
    }
  }catch(err){
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;