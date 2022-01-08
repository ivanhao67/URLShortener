const { request } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const alert = require('alert');

router.get('/', async (req, res) => {
  if(req.session.loggedin){
    res.redirect('/landing');
  }else{
    res.render('../views/pages/register.pug');
  }
});

router.post('/', async (req,res)=>{
  try{
    let uname = req.body.username;
    let pword = req.body.password;
    let found = await User.findOne({ username: uname });
    if(found){
      alert('A user with this username already exists');
      res.redirect('/register');
    }else{
      user = new User({
        username: uname,
        password: pword
      });
      await user.save(); 
      res.redirect("/login");
    }
  }catch (err){
    console.error(err);
    res.status(500).json('Server error');
  } 
});

module.exports = router;