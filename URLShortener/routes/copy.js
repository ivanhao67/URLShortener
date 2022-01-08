const express = require('express');
const router = express.Router();
const alert = require('alert');
var ncp = require("copy-paste");

router.post('/', async (req, res) => {
  ncp.copy(req.body.url, function () {})
  alert('Copied to Clipboard!');
  res.redirect('/links');
});

module.exports = router;