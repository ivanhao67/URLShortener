const express = require('express');
const router = express.Router();
const alert = require('alert');
const Url = require('../models/Url');

router.get('/', async (req, res) => {
  if(!req.session.loggedin){
    res.render('../views/pages/index.pug');
  }else{
    res.redirect('/landing');
  }
});

module.exports = router;