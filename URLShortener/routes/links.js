const express = require('express');
const router = express.Router();
const path = require('path');
const pug = require('pug');
const Url = require('../models/Url');

let reqPath = path.join(__dirname,'../');

router.get('/', async (req, res) => {
  let url = await Url.find({ username: req.session.username});
  let links = {};
  for(let x in url){
    let value = url[x].shortUrl;
    links[url[x].longUrl] = value;
  }
  res.send(
    pug.renderFile(reqPath+'/views/pages/links.pug', {
      links: links
    })
  );
});

module.exports = router;