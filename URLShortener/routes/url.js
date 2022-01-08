const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const alert = require('alert');
const Url = require('../models/Url');

router.post('/', async(req,res) =>{
  const longUrl = req.body.url;
  const baseUrl = config.get('baseUrl');
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }
  
  if(validUrl.isUri(longUrl)){
    const urlCode = shortid.generate();
    try{
      let url = await Url.findOne({ longUrl: longUrl, username: req.session.username});
      if(url){
        alert('Link already exists');
        res.redirect('/landing');
      }else{
        const shortUrl = baseUrl + '/url/' + urlCode;
        let uname = req.session.username;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          username: uname,
          date: new Date()  
        });    
        await url.save(); 
        alert('Link Generated');
        res.redirect('/landing');
      }
    }catch(err){
      console.error(err);
      res.status(500).json('Server error');
    }
  }else{
    alert('Invalid URL');
    res.redirect('/landing');
  }
});


router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      alert('No url found');
      res.redirect('/links');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }  
});

module.exports = router;