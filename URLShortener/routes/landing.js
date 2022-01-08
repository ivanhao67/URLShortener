const express = require('express');
const router = express.Router();
const pug = require('pug');
const path = require('path');

let reqPath = path.join(__dirname,'../');
router.get('/', async (req, res) => {
  res.send(
    pug.renderFile(reqPath+'/views/pages/landing.pug', {
      name: req.session.username
    })
  );
});

module.exports = router;